const Message = require("../model/messageModel")
const User = require("../model/userModel")

const sendMessage = async (req, res) => {
    const { senderName, receiverId, message, } = req.body;

    const sendMessage = new Message({
        senderId: req.user._id,
        senderName,
        receiverId,
        message: {
            text: message,
            image: ""
        },
    })


    const sentMessage = await sendMessage.save()

    res.status(201).json({
        success: true,
        message: sentMessage
    })
}

module.exports = {
    sendMessage
}