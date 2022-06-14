const User = require("../model/userModel")

const sendMessage = async (req, res) => {

    const receiverName = await User.findOne({_id: req.body.receiverId})

    res.json({
        message: 'wow! you did it.',
        senderId: req.user._id,
        receiverName: receiverName.name,
        message: req.body.message
    })
}

module.exports = {
    sendMessage
}