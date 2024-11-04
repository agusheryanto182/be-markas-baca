const { BookModel, validateBook } = require('../models/book_model')
const customError = require('../errors')
const imageHelper = require('../utils/image_helper')
const RES = require('../config/resMessage')
const { BookInputDTO, ListOfBooks, DetailBook, BookUpdateDTO } = require('../dto/book_dto')
const { bookEditionModel } = require('../models/book_edition_model')
const mongoose = require('mongoose');


const createBook = async (req, res, next) => {
    const { error } = validateBook(req.body);
    const session = await mongoose.startSession();
    let resCreateBook;

    try {
        session.startTransaction();

        if (error) {
            throw new customError.BadRequestError(RES.VALIDATION_ERROR + ': ', error.message);
        }

        const bookInput = new BookInputDTO(req.body);
        const book = new BookModel({
            authorId: bookInput.authorId,
            title: bookInput.title,
            summary: bookInput.summary,
            description: bookInput.description,
            categories: bookInput.categories,
        });

        const resultBook = await book.save({ session });
        if (!resultBook) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING);
        }

        const bookEditions = bookInput.bookEditions.map((item) => {
            if (!item.isbn || !item.quantity || item.isAvailable === undefined) {
                throw new customError.BadRequestError(RES.BAD_REQUEST, RES.STOCK_ITEM_MUST_HAVE_ISBN_QUANTITY_AND_ISAVAILABLE);
            }
            return {
                bookId: resultBook._id,
                isbn: item.isbn,
                quantity: item.quantity,
                isAvailable: item.isAvailable
            };
        });

        const isbnChecks = bookEditions.map(bookEdition => {
            return bookEditionModel.findOne({ isbn: bookEdition.isbn, deletedAt: null });
        });

        const results = await Promise.all(isbnChecks);
        const duplicateIsbn = results.some(result => result !== null);
        if (duplicateIsbn) {
            throw new customError.ConflictError(RES.CONFLICT, RES.DUPLICATE_VALUE_ENTERED_FOR_ISBN);
        }

        const result = await bookEditionModel.insertMany(bookEditions, { session });
        if (!result) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING);
        }

        bookInput.listBookIdEditions.push(...result.map((item) => item._id));

        const updatedNewBook = await BookModel.findOneAndUpdate(
            { _id: resultBook._id, deletedAt: null },
            { $push: { bookEditions: bookInput.listBookIdEditions } },
            { new: true, session }
        );

        if (!updatedNewBook) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING);
        }

        resCreateBook = await BookModel.findOne({ _id: resultBook._id, deletedAt: null })
            .populate({ path: 'bookEditions', model: 'BookEdition' })
            .populate({ path: 'authorId', model: 'Author' })
            .populate({ path: 'categories', model: 'Category' })
            .session(session);

        if (!resCreateBook) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_NOT_FOUND);
        }

        await session.commitTransaction();
        res.status(201).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_CREATED,
            data: {
                book: DetailBook(resCreateBook)
            }
        });
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
};

const getBooks = async (req, res, next) => {
    try {
        const result = await BookModel.find({ deletedAt: null })
            .populate({
                path: 'bookEditions',
                model: 'BookEdition'
            })
            .populate({
                path: 'authorId',
                model: 'Author'
            })
            .populate({
                path: 'categories',
                model: 'Category'
            })
            ;

        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_NOT_FOUND);
        }

        const formattedBooks = ListOfBooks(result);
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                book: formattedBooks
            }
        });
    } catch (err) {
        next(err);
    }
}


const getBookById = async (req, res, next) => {
    try {
        const result = await BookModel.findOne({ _id: req.params.id, deletedAt: null })
            .populate({
                path: 'bookEditions',
                model: 'BookEdition'
            })
            .populate({
                path: 'authorId',
                model: 'Author'
            })
            .populate({
                path: 'categories',
                model: 'Category'
            })
            ;

        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_NOT_FOUND);
        }

        const formattedBooks = DetailBook(result);
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                book: formattedBooks
            }
        });
    } catch (err) {
        next(err);
    }
}

const deleteBook = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const result = await BookModel.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true, session }
        );

        if (!result) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_NOT_FOUND);
        }

        const deletedBookEditions = await bookEditionModel.updateMany(
            { bookId: req.params.id },
            { deletedAt: new Date() },
            { session }
        );

        if (!deletedBookEditions || deletedBookEditions.modifiedCount === 0) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_DELETING);
        }


        await session.commitTransaction();
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_DELETED,
            data: {
                book: result
            }
        })
    } catch (err) {
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
}

const deleteBookEditions = async (req, res, next) => {
    const bookEditionId = req.params.id;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedBookEdition = await bookEditionModel.findOneAndUpdate(
            { _id: bookEditionId, deletedAt: null },
            { deletedAt: new Date() },
            { new: true, session }
        );

        if (!deletedBookEdition) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_EDITION_NOT_FOUND);
        }

        const updatedBook = await BookModel.updateOne(
            { _id: deletedBookEdition.bookId },
            { $pull: { bookEditions: deletedBookEdition._id } },
            { session }
        );

        if (updatedBook.modifiedCount === 0) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.FAILED_TO_UPDATE_BOOK_REFERENCES);
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_DELETED,
            data: deletedBookEdition,
        });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
}

const updateBook = async (req, res, next) => {
    const { error } = validateBook(req.body)
    const inputBookEditions = req.body.bookEditions
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        if (error) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const bookInput = new BookInputDTO(req.body);
        const book = new BookUpdateDTO({
            authorId: bookInput.authorId,
            title: bookInput.title,
            summary: bookInput.summary,
            description: bookInput.description,
            categories: bookInput.categories,
        });

        let checkIsbn = [];
        const oldBook = await BookModel.findOne({ _id: req.params.id, deletedAt: null }).populate({ path: 'bookEditions', model: 'BookEdition' });
        if (oldBook.bookEditions.length !== inputBookEditions.length) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.YOU_CANNOT_DELETE_BOOK_EDITIONS_FROM_BOOK);
        }

        for (let i = 0; i < oldBook.bookEditions.length; i++) {
            const currCheckIsbn = oldBook.bookEditions[i].isbn === inputBookEditions[i].isbn
            if (!currCheckIsbn) {
                checkIsbn.push(inputBookEditions[i])
            }
        }

        const isbnChecks = checkIsbn.map(bookEdition => {
            return bookEditionModel.findOne({ isbn: bookEdition.isbn, deletedAt: null });
        });

        const results = await Promise.all(isbnChecks);
        const duplicateIsbn = results.some(result => result !== null);
        if (duplicateIsbn) {
            throw new customError.ConflictError(RES.CONFLICT, RES.DUPLICATE_VALUE_ENTERED_FOR_ISBN);
        }

        for (let i = 0; i < inputBookEditions.length; i++) {
            const updateBookEdition = await bookEditionModel.findOneAndUpdate(
                { _id: oldBook.bookEditions[i]._id, deletedAt: null },
                inputBookEditions[i],
                { new: true }
            );

            if (!updateBookEdition) {
                const createBookEdition = await bookEditionModel.create(inputBookEditions[i]);
                if (!createBookEdition) {
                    throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING);
                }
            }
        }

        const updatedBook = await BookModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, book, { new: true })
            .populate({ path: 'bookEditions', model: 'BookEdition' })
            .populate({ path: 'authorId', model: 'Author' })
            .populate({ path: 'categories', model: 'Category' });
        if (!updatedBook) {
            throw new customError.NotFoundError(RES.BOOK_NOT_FOUND)
        }

        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_UPDATED,
            data: {
                book: updatedBook
            }
        })
    } catch (err) {
        next(err)
    }
}

const uploadBookImage = async (req, res, next) => {
    const { bookId } = req.body
    try {
        if (!bookId) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.BOOK_ID_IS_REQUIRED)
        }
        const imageUrl = await imageHelper.generateUrlImage('books', req.file, next)
        const result = await BookModel.findOneAndUpdate({ _id: bookId, deletedAt: null }, { imageUrl }, { new: true })
            .populate({ path: 'bookEditions', model: 'BookEdition' })
            .populate({ path: 'authorId', model: 'Author' })
            .populate({ path: 'categories', model: 'Category' });

        if (!result) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BOOK_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_UPLOADED,
            data: {
                book: result
            }
        })
    } catch (err) {
        imageHelper.deleteImage(req.file.path)
        next(err)
    }
}

module.exports = {
    createBook,
    getBooks,
    getBookById,
    deleteBook,
    updateBook,
    uploadBookImage,
    deleteBookEditions
}