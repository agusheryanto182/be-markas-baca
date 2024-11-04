const { BorrowerModel, validateBorrower } = require('../models/borrower_model')
const customError = require('../errors')
const RES = require('../config/resMessage')

const createBorrower = async (req, res, next) => {
    const { error } = validateBorrower(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const borrower = new BorrowerModel(req.body)

        const result = await borrower.save()
        if (!result) {
            throw new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_CREATING)
        }

        res.status(201).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_CREATED,
            data: {
                borrower: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const getBorrowers = async (req, res, next) => {
    try {
        const result = await BorrowerModel.find({ deletedAt: null })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BORROWER_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                borrower: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const getBorrowerById = async (req, res, next) => {
    try {
        const result = await BorrowerModel.find({ _id: req.params.id, deletedAt: null })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BORROWER_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_FETCHED,
            data: {
                borrower: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const deleteBorrower = async (req, res, next) => {
    try {
        const result = await BorrowerModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, { deletedAt: new Date() }, { new: true })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BORROWER_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_DELETED,
            data: {
                borrower: result
            }
        })
    } catch (err) {
        next(err)
    }
}

const updateBorrower = async (req, res, next) => {
    const { error } = validateBorrower(req.body)

    try {
        if (error) {
            throw new customError.BadRequestError(RES.BAD_REQUEST, RES.VALIDATION_ERROR + ': ' + error.message)
        }

        const result = await BorrowerModel.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, req.body, { new: true })
        if (!result || result.length === 0) {
            throw new customError.NotFoundError(RES.NOT_FOUND, RES.BORROWER_NOT_FOUND)
        }
        res.status(200).json({
            status: RES.SUCCESS,
            message: RES.SUCCESSFULLY_UPDATED,
            data: {
                borrower: result
            }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createBorrower,
    getBorrowers,
    getBorrowerById,
    deleteBorrower,
    updateBorrower
}