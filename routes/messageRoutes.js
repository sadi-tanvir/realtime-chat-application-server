const router = require('express').Router()
const { sendMessage, getMessages } = require('../controllers/messageController')
const auth = require('../middleware/auth')




router.route('/sendMessage').post(auth, sendMessage)
router.get('/getMessages/:id', auth, getMessages)



module.exports = router

