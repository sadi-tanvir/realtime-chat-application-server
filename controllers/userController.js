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
            message: "The User Has Registered Successfully",
            user,
            token: generateToken(user.email)
        })
    } catch (error) {
        res.status(500).json(error)
    }
}


// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ email })
        if (!user) return res.status(409).json({ message: 'User Not Exist.' })

        bcrypt.compare(password, user.password, (error, decoded) => {
            if (!decoded) return res.status(401).json({ message: 'Password doesn\'t match.' })

            res.status(200).json({
                message: "User Login successFully.",
                user,
                token: generateToken(user.email)
            })
        })

    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    registerUser,
    loginUser
}