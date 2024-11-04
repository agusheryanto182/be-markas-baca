const { StatusCodes } = require("http-status-codes")
const CustomAPIError = require('./custom_api_error')

class ConflictError extends CustomAPIError {
    constructor(message, errors = null) {
        super(message, errors);
        this.statusCode = StatusCodes.CONFLICT
    }
}

module.exports = ConflictError