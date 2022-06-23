const Message = require("../model/messageModel")
const User = require("../model/userModel")


// get last message
const getLastMessage = async (userId, friendId) => {
    const lastMessage = Message.findOne({
        $or: [
            {
                $and: [{ senderId: { $eq: userId } }, { receiverId: { $eq: friendId } }]
            },
            {
                $and: [{ receiverId: { $eq: userId } }, { senderId: { $eq: friendId } }]
            }
        ]
    }).sort({ updatedAt: -1 })

    return lastMessage
}




// get all friends
const getFriends = async (req, res) => {
    try {
        let friendsInfo = []
        
        const query = req.query.search ? {
            $and: [
                { email: { $ne: req.user.email } },
                {
                    $or: [
                        { name: { $regex: req.query.search, $options: 'i' } },
                        { email: { $regex: req.query.search, $options: 'i' } }
                    ]
                }
            ]

        } : { email: { $ne: req.user.email } };


        // get all friends with search query
        const users = await User.find(query).select("-password")

        // sent user & friend id for find last message
        for (let i = 0; i < users.length; i++) {
            const lastMsg = await getLastMessage(req.user._id, users[i]._id)

            // user information and last message pushed to the array
            friendsInfo = [...friendsInfo, { friendInfo: users[i], lastMsg: lastMsg }]
        }

        // send response to client
        res.json({ users: friendsInfo })

    } catch (error) {
        res.status(500).json(error)
    }
}

// send text message
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


// get all messages
const getMessages = async (req, res) => {
    const userId = req.user._id;
    const friendId = req.params.id

    try {
        let getMessages = await Message.find({
            $or: [
                {
                    $and: [{ senderId: { $eq: userId } }, { receiverId: { $eq: friendId } }]
                },
                {
                    $and: [{ receiverId: { $eq: userId } }, { senderId: { $eq: friendId } }]
                }
            ]
        })

        // getMessages = getMessages.filter(m => (m.senderId == userId && m.receiverId == friendId) || (m.receiverId == userId && m.senderId == friendId))

        res.status(200).json({
            success: true,
            messages: getMessages
        })
    } catch (error) {
        res.send(error)
    }
}

// send image message
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
    sendImageMessage,
    getFriends
}





    // const { senderId, receiverId } = req.query;

    // const messages = await Message.find({
    //     $or: [

    //     ]
    // })