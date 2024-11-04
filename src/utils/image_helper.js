const fs = require('fs');
const path = require('path');
const customError = require('../errors');
const RES = require('../config/resMessage');

const deleteImage = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};


const generateUrlImage = async (destination, req, next) => {
    let result = '';
    if (destination) {
        result = `uploads/${destination}/${req.filename}`;
        if (!fs.existsSync(path.join(__dirname, `../../public/${result}`))) {
            return next(new customError.InternalServerError(RES.INTERNAL_SERVER_ERROR, RES.SOMETHING_WENT_WRONG_WHILE_UPLOADING));
        }
    } else {
        result = `uploads/${req.filename}`;
    }
    return result;
};


module.exports = { generateUrlImage, deleteImage };
