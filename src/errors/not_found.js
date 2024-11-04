const { StatusCodes } = require("http-status-codes")
const CustomAPIError = require('./custom_api_error')

class NotFoundError extends CustomAPIError {
    constructor(message, errors = null) {
        super(message, errors);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError