const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const http = require('http')

// create server
const port = process.env.PORT || 5000
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: port,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

// components
require('./config/db')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')


// middleware
app.use(cors())
app.use(express.json())


app.use(express.static('public'))

// routes
app.use(userRoutes)
app.use(messageRoutes)

var users = []

function addUser(userId, socketId, userInfo) {
    const isUserExist = users.some(user => user.userId === userId)
    if (!isUserExist) {
        console.log(`this is active`);
        users.push({ userId, socketId, userInfo })
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const findUser = (id) => {
    const ss = users.find(user => user.userId === id)
    return ss

}

io.on('connection', (socket) => {
    console.log(`socket is running on port ${port}`);

    socket.on('addUser', (userId, userInfo) => {
        addUser(userId, socket.id, userInfo)
        io.emit('getUsers', users)
    })

    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUsers', users)
    })


    socket.on('sendMessage', (messageInfo) => {
        // console.log(messageInfo);
        const isUserActive = findUser(messageInfo.receiverId)
        io.emit('receiveMessage', messageInfo)
    })


    socket.on('typingMessage', (data) => {
        const isUserActive = findUser(data.receiverId)
        socket.broadcast.emit('typingMessageStatus', data)
    })


})


server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})