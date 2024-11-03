const upload = require("../middlewares/multers");
const customError = require("../errors")
const RES = require("../config/resMessage")

const multerHandler = (destination) => {
    return (req, res, next) => {
        if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
            return upload(destination).single('image')(req, res, (err) => {
                if (err) {
                    return next(new customError.InternalServerError(RES.SOMETHING_WENT_WRONG + ': ' + err.message));
                }
                if (!req.file) {
                    return next(new customError.BadRequestError(RES.IMAGE_IS_REQUIRED));
                }
                next();
            });
        }
        return next(new customError.BadRequestError(RES.INVALID_CONTENT_TYPE));
    };
};


module.exports = multerHandler