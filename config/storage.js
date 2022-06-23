const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/message-images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let ext = path.extname(file.originalname).toLocaleLowerCase()
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

module.exports = storage