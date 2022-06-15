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


const getMessages = async (req, res) => {
    const userId = req.user._id;
    const friendId = req.params.id

    try {
        let getMessages = await Message.find({})
        getMessages = getMessages.filter(m => (m.senderId == userId && m.receiverId == friendId) || (m.receiverId == userId && m.senderId == friendId))

        res.status(200).json({
            success: true,
            messages: getMessages
        })
    } catch (error) {
        res.send(error)
    }
}


const sendImageMessage = async (req, res) => {
    const { senderName, receiverId } = req.body;

    const sendMessage = new Message({
        senderId: req.user._id,
        senderName,
        receiverId,
        message: {
            text: "",
            image: req.file.filename
        },
    })


    const sentMessage = await sendMessage.save()

    res.status(201).json({
        success: true,
        message: sentMessage
    })

}

module.exports = {
    sendMessage,
    getMessages,
    sendImageMessage
}





    // const { senderId, receiverId } = req.query;

    // const messages = await Message.find({
    //     $or: [

    //     ]
    // })