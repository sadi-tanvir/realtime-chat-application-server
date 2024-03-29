const mongoose = require('mongoose')



const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    message: {
        text: { type: String, default: '' },
        image: { type: String, default: '' }
    },
    status: {
        type: String,
        default: 'unseen'
    }
}, { timestamps: true })


const Message = new mongoose.model('Message', messageSchema)

module.exports = Message