const router = require('express').Router()
const { sendMessage } = require('../controllers/messageController')
const auth = require('../middleware/auth')




router.route('/sendMessage').post(auth, sendMessage)



module.exports = router

