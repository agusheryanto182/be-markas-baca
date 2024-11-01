const { StatusCodes } = require("http-status-codes")
const CustomAPIError = require('./custom_api_error')

class InternalServerError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }
}

module.exports = InternalServerError