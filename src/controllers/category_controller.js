const { CategoryModel, validateCategory } = require('../models/category_model')
const customError = require('../errors')
const RES = require('../config/resMessage')

const createCategory = async (req, res, next) => {
    const { error } = validateCategory(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const category = new CategoryModel(req.body)

        const result = await category.save()
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

const getCategorys = async (req, res, next) => {
    try {
        const result = await CategoryModel.find({ deletedAt: null })
        if (!result) {
            throw new customError.NotFoundError(RES.CATEGORY_NOT_FOUND)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_FETCHED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        const result = await CategoryModel.find({ _id: req.params.id, deletedAt: null })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.CATEGORY_NOT_FOUND)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_FETCHED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const updateCategory = async (req, res, next) => {
    const { error } = validateCategory(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const result = await CategoryModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, req.body, { new: true })
        if (!result) {
            throw new customError.NotFoundError(RES.CATEGORY_NOT_FOUND)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_UPDATED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const result = await CategoryModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, { deletedAt: new Date() }, { new: true })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.CATEGORY_NOT_FOUND)
        }
        res.status(200).json({
            message: RES.SUCCESSFULLY_DELETED,
            data: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createCategory,
    getCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory
}