const { StatusCodes } = require("http-status-codes")
const RES = require("../config/resMessage")
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message);

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || RES.SOMETHING_WENT_WRONG_TRY_AGAIN_LATER,
    };

    if (err.name === 'ValidationError') {
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ')
        customError.statusCode = 400;
    }

    if (err.code && err.code === 11000) {
        customError.message = RES.DUPLICATE_VALUE_ENTERED_FOR + ` ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = 400;
    }
    if (err.name === 'CastError') {
        customError.message = RES.NO_ITEM_FOUND_WITH_ID + ` : ${err.value}`;
        customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({ message: customError.message });
}

module.exports = errorHandlerMiddleware;