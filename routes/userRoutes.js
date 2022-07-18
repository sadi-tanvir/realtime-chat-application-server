const router = require('express').Router()
const { registerUser,loginUser,UpdateUserInfo,changePassword } = require('../controllers/userController')
const auth = require('../middleware/auth')


// register user
router.post('/register', registerUser)


// login user
router.post('/login', loginUser)

// Update user Info
router.put('/updateUserInfo',auth, UpdateUserInfo)

// Change Password
router.put('/changePassword',auth, changePassword)





module.exports = router

