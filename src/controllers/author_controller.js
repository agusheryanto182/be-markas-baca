const { AuthorModel, validateAuthor } = require('../models/author_model')
const customError = require('../errors')
const imageHelper = require('../utils/image_helper')

const createAuthor = async (req, res, next) => {
    const { error } = validateAuthor(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError('validation error : ' + error.message)
        }

        const author = new AuthorModel(req.body)

        const result = await author.save()
        if (!result) {
            throw new customError.InternalServerError('something went wrong while creating author')
        }

        res.status(201).json({
            message: 'successfully created author',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const getAuthors = async (req, res, next) => {
    try {
        const result = await AuthorModel.find({ deletedAt: null })
        if (!result) {
            throw new customError.NotFoundError('author not found')
        }
        res.status(200).json({
            message: 'successfully fetched authors',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const getAuthorsById = async (req, res, next) => {
    try {
        const result = await AuthorModel.find({ _id: req.params.id, deletedAt: null })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError('author not found with id : ' + req.params.id)
        }
        res.status(200).json({
            message: 'successfully fetched authors',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const updateAuthor = async (req, res, next) => {
    const { error } = validateAuthor(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError('validation error : ' + error.message)
        }

        const result = await AuthorModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, req.body, { new: true })
        if (!result) {
            throw new customError.NotFoundError('author not found with id : ' + req.params.id)
        }
        res.status(200).json({
            message: 'successfully updated author',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const result = await AuthorModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, { deletedAt: new Date() }, { new: true })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError('author not found with id : ' + req.params.id)
        }
        res.status(200).json({
            message: 'successfully deleted author',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const uploadAuthorImage = async (req, res, next) => {
    const { authorId } = req.body
    try {
        const imageUrl = await imageHelper.generateUrlImage(req.file)

        const result = await AuthorModel.findOneAndUpdate({ _id: authorId, deletedAt: null }, { imageUrl: imageUrl }, { new: true })
        if (!result) {
            throw new customError.NotFoundError('author not found with id : ' + authorId)
        }
        res.status(200).json({
            message: 'successfully uploaded author image',
            data: result
        })
    } catch (err) {
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