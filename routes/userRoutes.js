const router = require('express').Router()
const { registerUser,loginUser, getFriends } = require('../controllers/userController')
const auth = require('../middleware/auth')


// register user
router.post('/register', registerUser)


// login user
router.post('/login', loginUser)


// getUsers
router.get('/get-friends', auth, getFriends)



module.exports = router

