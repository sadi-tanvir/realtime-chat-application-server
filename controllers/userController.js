const { registerValidator } = require('../middleware/velidatorAuth')
const User = require('../model/userModel')
const generateToken = require('../config/generateToken')
const bcrypt = require('bcryptjs');

// register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, picture } = req.body;
        // validation check
        const auth = registerValidator({ name, email, password })
        if (!auth.isValid) return res.status(400).json(auth.error)

        // is user already exist
        const userExist = await User.findOne({ email })
        if (userExist) return res.status(409).json({ message: 'User already exist.' })

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // create new user
        const user = await User.create({
            name, email, password: hash, picture
        })
        if (!user) return res.status(400).json({ message: 'failed to create The user.' })

        res.status(201).json({
            user,
            token: generateToken(user.email)
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    registerUser
}