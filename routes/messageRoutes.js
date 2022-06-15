const router = require('express').Router()
const { sendMessage, getMessages, sendImageMessage } = require('../controllers/messageController')
const auth = require('../middleware/auth')
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

const upload = multer({ storage: storage })

router.route('/sendMessage').post(auth, sendMessage)
router.get('/getMessages/:id', auth, getMessages)


router.post('/sendImageMessage', auth, upload.single('message-image'), sendImageMessage)



module.exports = router

