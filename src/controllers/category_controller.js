const { CategoryModel, validateCategory } = require('../models/category_model')
const customError = require('../errors')
const RES = require('../config/resMessage')
const mongoose = require('mongoose');
const { BookModel } = require('../models/book_model')

const createCategory = async (req, res, next) => {
    const { error } = validateCategory(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const category = new CategoryModel(req.body)

        const result = await category.save()
        if (!result) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING)
        }

        res.status(201).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_CREATED,
            data: {
                category: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const getCategorys = async (req, res, next) => {
    try {
        const result = await CategoryModel.find({ deletedAt: null })
        if (!result) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.CATEGORY_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                category: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const getCategoryById = async (req, res, next) => {
    const categoryId = req.params.id
    try {
        if (!categoryId) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.CATEGORY_ID_IS_REQUIRED)
        }

        const result = await CategoryModel.find({ _id: categoryId, deletedAt: null })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.CATEGORY_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                category: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const updateCategory = async (req, res, next) => {
    const { error } = validateCategory(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const result = await CategoryModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, req.body, { new: true })
        if (!result) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.CATEGORY_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_UPDATED,
            data: {
                category: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const deleteCategory = async (req, res, next) => {
    const session = await mongoose.startSession();
    const categoryId = req.params.id
    try {
        session.startTransaction();

        const result = await CategoryModel.findOneAndUpdate({ _id: categoryId, deletedAt: null }, { deletedAt: new Date() }, { new: true, session })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.CATEGORY_NOT_FOUND)
        }

        const deleteCategoryInBooks = await BookModel.updateMany(
            { categories: categoryId },
            { $pull: { categories: categoryId } },
            { session, new: true }
        );

        if (!deleteCategoryInBooks) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.CATEGORY_NOT_FOUND_IN_BOOKS);
        }

        await session.commitTransaction();
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_DELETED,
            data: {
                category: result
            }
        })
    } catch (err) {
        await session.abortTransaction();
        next(err)
    } finally {
        session.endSession();
    }
}

module.exports = {
    createCategory,
    getCategorys,
    getCategoryById,
    updateCategory,
    deleteCategory
}