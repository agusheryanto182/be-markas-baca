const { StatusCodes } = require("http-status-codes")
const RES = require("../config/resMessage")
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        status: err.status || RES.ERROR,
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || RES.SOMETHING_WENT_WRONG,
        errors: err.errors || {}
    };

    if (err.name === 'ValidationError') {
        customError.errors = Object.values(err.errors)
            .map((item) => item.errors)
            .reduce((acc, curr) => ({ ...acc, ...curr }), {}); // Mengubah ke objek
        customError.statusCode = StatusCodes.BAD_REQUEST; // 400
        customError.message = RES.VALIDATION_ERROR;
    }

    if (err.code && err.code === 11000) {
        customError.errors = RES.DUPLICATE_VALUE_ENTERED_FOR + ` ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST; // 400
        customError.message = RES.DUPLICATE_VALUE;
    }

    if (err.name === 'CastError') {
        customError.message = RES.FAILED;
        customError.errors = RES.ITEM_NOT_FOUND;
        customError.statusCode = StatusCodes.NOT_FOUND; // 404
    }

    return res.status(customError.statusCode).json({
        status: customError.status,
        message: customError.message,
        errors: customError.errors,
    });
};

module.exports = errorHandlerMiddleware;