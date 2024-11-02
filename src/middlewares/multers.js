const multer = require('multer');
const generateUUID = require('../utils/generate_uuid');
const RES = require('../config/resMessage');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.split('.')[0] + '-' + generateUUID() + '.' + file.mimetype.split('/')[1]);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        //reject file
        cb(
            {
                message: RES.UNSUPPORT_FILE_FORMAT,
            },
            false
        );
    }
};

const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 10000000,
    },
    fileFilter: fileFilter,
});


module.exports = uploadMiddleware;