const { AuthorModel, validateAuthor } = require('../models/author_model')
const customError = require('../errors')
const imageHelper = require('../utils/image_helper')
const RES = require('../config/resMessage')
const { BookModel } = require("../models/book_model")
const mongoose = require('mongoose');

const createAuthor = async (req, res, next) => {
    const { error } = validateAuthor(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const author = new AuthorModel(req.body)

        const result = await author.save()
        if (!result) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING)
        }

        res.status(201).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_CREATED,
            data: {
                author: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const getAuthors = async (req, res, next) => {
    try {
        const result = await AuthorModel.find({ deletedAt: null })
        if (!result) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.AUTHOR_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                author: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const getAuthorsById = async (req, res, next) => {
    try {
        const result = await AuthorModel.findOne({ _id: req.params.id, deletedAt: null })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.AUTHOR_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                author: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const updateAuthor = async (req, res, next) => {
    const { error } = validateAuthor(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const result = await AuthorModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, req.body, { new: true })
        if (!result) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.AUTHOR_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_UPDATED,
            data: {
                author: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const result = await AuthorModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, { deletedAt: new Date() }, { new: true })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.AUTHOR_NOT_FOUND)
        }

        await BookModel.findOneAndUpdate({ authorId: req.params.id }, { authorId: null })

        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_DELETED,
            data: {
                author: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const uploadAuthorImage = async (req, res, next) => {
    const { authorId } = req.body
    try {
        if (!authorId) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.AUTHOR_ID_IS_REQUIRED)
        }
        const imageUrl = await imageHelper.generateUrlImage('authors', req.file)

        const result = await AuthorModel.findOneAndUpdate({ _id: authorId, deletedAt: null }, { imageUrl: imageUrl }, { new: true })
        if (!result) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.AUTHOR_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_UPLOADED,
            data: {
                author: result
            }
        })
    } catch (err) {
        imageHelper.deleteImage(req.file.path)
        next(err)
    }
}

module.exports = {
    createAuthor,
    getAuthors,
    getAuthorsById,
    updateAuthor,
    deleteAuthor,
    uploadAuthorImage
}