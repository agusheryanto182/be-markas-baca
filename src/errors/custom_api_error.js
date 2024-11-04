class CustomAPIError extends Error {
    constructor(message, errors, statusCode) {
        super(message);
        this.errors = errors;
        this.statusCode = statusCode;
    }
}

module.exports = CustomAPIError;
