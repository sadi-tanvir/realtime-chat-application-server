const jwt = require('jsonwebtoken');
const User = require('../model/userModel');



const auth = (req, res, next) => {
    // get token from headers
    const token = req.headers['x-access-token'];
    // if token not found
    if (!token) return res.status(401).json({ message: 'Unauthorized User.' })

    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        try {
            if (error) return res.status(403).json({ message: 'Forbidden user.' })

            req.user = await User.findOne({ email: decoded.email }).select("-password")

            next()
        } catch (error) {
            res.status(500).json({ error })
        }
    })
}

module.exports = auth