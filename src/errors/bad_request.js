const { StatusCodes } = require("http-status-codes")
const CustomAPIError = require("./custom_api_error")

class BadRequestError extends CustomAPIError {
    constructor(message, errors = null) {
        super(message, errors);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestError