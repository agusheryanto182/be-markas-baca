const { BookModel, validateBook, customValidateBook } = require('../models/book_model')
const customError = require('../errors')
const imageHelper = require('../utils/image_helper')
const RES = require('../config/resMessage')


const createBook = async (req, res, next) => {
    const { error } = validateBook(req.body)
    try {
        if (error) {
            throw new customError.BadRequestError(RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const book = new BookModel(req.body)

        const result = await book.save()
        if (!result) {
            throw new customError.InternalServerError(RES.SOMETHING_WENT_WRONG_WHILE_CREATING)
        }

        res.status(201).json({
            message: RES.SUCCESSFULLY_CREATED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const getBooks = async (req, res, next) => {
    try {
        const result = await BookModel.find({ deletedAt: null })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.BOOK_NOT_FOUND)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_FETCHED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const getBookById = async (req, res, next) => {
    try {
        const result = await BookModel.find({ _id: req.params.id, deletedAt: null })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.BOOK_NOT_FOUND_WITH_ID + ': ' + req.params.id)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_FETCHED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const result = await BookModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, { deletedAt: new Date() }, { new: true })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.BOOK_NOT_FOUND_WITH_ID + ': ' + req.params.id)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_DELETED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const updateBook = async (req, res, next) => {
    const { error } = customValidateBook(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.VALIDATION_ERROR + ': ' + error.message)
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(204).send();
        }

        const result = await BookModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, req.body, { new: true })
        if (!result) {
            throw new customError.NotFoundError(RES.BOOK_NOT_FOUND_WITH_ID + ': ' + req.params.id)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_UPDATED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const uploadBookImage = async (req, res, next) => {
    const { bookId } = req.body
    try {
        if (!bookId) {
            throw new customError.BadRequestError(RES.BOOK_ID_IS_REQUIRED)
        }
        const imageUrl = await imageHelper.generateUrlImage('books', req.file, next)
        const result = await BookModel.findOneAndUpdate({ _id: bookId, deletedAt: null }, { imageUrl }, { new: true })
        if (!result) {
            throw new customError.NotFoundError(RES.BOOK_NOT_FOUND_WITH_ID + ': ' + bookId)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_UPLOADED,
            data: result
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
    uploadBookImage
}