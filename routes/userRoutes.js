const router = require('express').Router()
const { registerUser,loginUser } = require('../controllers/userController')
const auth = require('../middleware/auth')


// register user
router.post('/register', registerUser)


// login user
router.post('/login', loginUser)





module.exports = router

