const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    limits: {fileSize : 3 * 1024 * 1024 },
    destination(req, file, cb) {
        cb(null, 'public/imgCard')
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter
}) 