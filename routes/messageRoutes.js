const router = require('express').Router()
const { getFriends, sendMessage, getMessages, sendImageMessage } = require('../controllers/messageController')
const auth = require('../middleware/auth')
const multer = require('multer')

// photo upload
const storage = require('../config/storage')
const upload = multer({ storage })


// get all friends
router.get('/get-friends', auth, getFriends)

// get all messages
router.get('/getMessages/:id', auth, getMessages)

// send text message
router.route('/sendMessage').post(auth, sendMessage)

// send image message
router.post('/sendImageMessage', auth, upload.single('message-image'), sendImageMessage)



module.exports = router

