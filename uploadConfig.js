const multer = require('multer');
const uid = require('uid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, uid() + file.originalname)
});

const limits = {
    fileSize: 100 * 1024
}

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        return cb(null, true);
    }
    cb(new Error('File type is incorrect'));
}

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
