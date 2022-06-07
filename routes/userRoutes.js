const router = require('express').Router()
const { registerUser } = require('../controllers/userController')


// register user
router.post('/register', registerUser)



module.exports = router

