const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => {
        cb(null, `${req.body.name}${Date.now()}.png`)
    }
});

const limits = { fileSize: 102400 };

// function fileFilter(req, file, cb) {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') return cb(null, true);
//     cb(new Error('Loi dinh dang'));
// }

const upload = multer({ storage, limits });
module.exports = upload;
