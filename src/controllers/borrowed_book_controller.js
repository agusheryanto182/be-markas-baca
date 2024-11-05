const { BorrowedBookModel, validateBorrowedBook } = require('../models/borrowed_book_model')
const customError = require('../errors')
const RES = require('../config/resMessage')
const { BookModel } = require("../models/book_model")
const { BorrowerModel } = require("../models/borrower_model")
const { bookEditionModel } = require("../models/book_edition_model")
const mongoose = require('mongoose');
const { ListOfBorrowedBooks, DetailBorrowedBook } = require('../dto/borrowed_book_dto')
const { BookStockLogModel } = require('../models/book_stock_log_model')

const createBorrowedBook = async (req, res, next) => {
    const session = await mongoose.startSession();
    const { error } = validateBorrowedBook(req.body)
    const minReturnDays = 1;
    const maxReturnDays = 30;
    const now = new Date();

    const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    const minReturnDate = todayUTC + (minReturnDays * 24 * 60 * 60 * 1000);
    const maxReturnDate = todayUTC + (maxReturnDays * 24 * 60 * 60 * 1000);

    try {
        session.startTransaction();

        if (error) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const borrowedBook = new BorrowedBookModel(req.body)
        borrowedBook.borrowedAt = Date.now()
        const book = await BookModel.findOne({ _id: borrowedBook.bookId, deletedAt: null })
        const borrower = await BorrowerModel.findOne({ _id: borrowedBook.borrowerId, deletedAt: null })
        const bookEdition = await bookEditionModel.findOne({ _id: borrowedBook.bookEditionId, deletedAt: null })
        const newQuantity = bookEdition.quantity - borrowedBook.quantity

        if (!book) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_NOT_FOUND)
        }

        if (!borrower) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BORROWER_NOT_FOUND)
        }

        if (!bookEdition) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_EDITION_NOT_FOUND)
        }

        if (!bookEdition.isAvailable) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.BOOK_EDITION_IS_NOT_AVAILABLE)
        }

        if (newQuantity < 0) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.QUANTITY_IS_NOT_ENOUGH)
        }

        if (borrowedBook.expectedReturnAt < Date.now()) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.EXPECTED_RETURN_DATE_IS_PASSED)
        }

        // Check expected return date
        if (borrowedBook.expectedReturnAt < minReturnDate) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.EXPECTED_RETURN_DATE_TOO_SOON);
        }

        if (borrowedBook.expectedReturnAt > maxReturnDate) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.EXPECTED_RETURN_DATE_IS_TOO_FUTURE);
        }

        const result = await borrowedBook.save({ session })
        await result.populate([
            { path: 'bookEditionId', model: 'BookEdition' },
            { path: 'borrowerId', model: 'Borrower' },
            { path: 'bookId', model: 'Book' }
        ]);

        if (!result) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING)
        }

        let updateQuantityBookEdition;
        if (newQuantity === 0) {
            updateQuantityBookEdition = await bookEditionModel.findOneAndUpdate(
                { _id: borrowedBook.bookEditionId },
                {
                    quantity: newQuantity,
                    isAvailable: false
                },
                { new: true, session }
            );
        } else {
            updateQuantityBookEdition = await bookEditionModel.findOneAndUpdate(
                { _id: borrowedBook.bookEditionId },
                { quantity: newQuantity },
                { new: true, session }
            );
        }

        if (!updateQuantityBookEdition) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING)
        }

        await BookStockLogModel.create(
            [{ borrowedBookId: result._id, status: 'borrowed' }],
            { session }
        );


        await session.commitTransaction();
        res.status(201).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_CREATED,
            data: {
                borrowedBook: DetailBorrowedBook(result)
            }
        })

    } catch (err) {
        await session.abortTransaction();
        next(err)
    } finally {
        session.endSession();
    }
}

const getBorrowedBooks = async (req, res, next) => {
    try {
        const result = await BorrowedBookModel.find({ returnedAt: null })
            .populate({
                path: 'bookEditionId',
                model: 'BookEdition'
            })
            .populate({
                path: 'borrowerId',
                model: 'Borrower'
            })
            .populate({
                path: 'bookId',
                model: 'Book'
            });
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BORROWED_BOOK_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                borrowedBook: ListOfBorrowedBooks(result)
            }
        })
    } catch (err) {
        next(err)
    }
}

const returnBook = async (req, res, next) => {
    const { borrowedId } = req.body;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const now = new Date();
        const returnDate = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

        if (!borrowedId) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.BORROWED_BOOK_ID_IS_REQUIRED);
        }

        const borrowedBook = await BorrowedBookModel.findOne({ _id: borrowedId, returnedAt: null }).session(session);
        if (!borrowedBook) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BORROWED_BOOK_NOT_FOUND);
        }

        const expectedReturnDate = Date.UTC(
            borrowedBook.expectedReturnAt.getUTCFullYear(),
            borrowedBook.expectedReturnAt.getUTCMonth(),
            borrowedBook.expectedReturnAt.getUTCDate()
        );

        // Calculate late days
        let fine = 0;
        if (returnDate > expectedReturnDate) {
            const lateDays = Math.floor((returnDate - expectedReturnDate) / (1000 * 60 * 60 * 24));
            fine = (lateDays * 2000) * borrowedBook.quantity;
        }

        const bookEdition = await bookEditionModel.findOne({ _id: borrowedBook.bookEditionId }).session(session);
        if (!bookEdition) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_RETURNING);
        }

        bookEdition.quantity += borrowedBook.quantity;
        await bookEdition.save({ session });

        borrowedBook.returnedAt = now;
        borrowedBook.penalties = fine;
        await borrowedBook.save({ session });

        await BookStockLogModel.findOneAndUpdate(
            { borrowedBookId: borrowedBook._id },
            { status: 'returned' },
            { new: true, session })

        await session.commitTransaction();
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_RETURNED,
            data: {
                borrowedBook: DetailBorrowedBook(borrowedBook)
            }
        });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};

const getListStockLog = async (req, res, next) => {
    try {
        const result = await BookStockLogModel.find().populate({
            path: 'borrowedBookId',
            model: 'BorrowedBook'
        });
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_STOCK_LOG_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                bookStockLog: result
            }
        })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    createBorrowedBook,
    getBorrowedBooks,
    returnBook,
    getListStockLog
}