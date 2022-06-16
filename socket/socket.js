const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

let users = []

const addUser = (userId, socketId, userInfo) => {
   const isUserExist = users.some(user => user.userId === userId)
   if(!isUserExist){
    users.push({userId, socketId, userInfo})
   }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId) 
}

const findUser = (id) => {
    return users.find(user  => user.userId === id)
    
}

io.on('connection', (socket) => {
    console.log('socket is running on port 8000');

    socket.on('addUser', (userId, userInfo) => {
        addUser(userId, socket.id, userInfo)
        io.emit('getUsers', users)
    })

    socket.on('disconnect', () => {
        console.log(`user disconnected.`);
        removeUser(socket.id)
        io.emit('getUsers', users)
    })


    socket.on('sendMessage', (messageInfo) => {
        console.log(messageInfo);
        const isUserActive = findUser(messageInfo.receiverId)
        if(isUserActive !== undefined){
            io.to(isUserActive.socketId).emit('receiveMessage', messageInfo)
        }
        io.emit('receiveMessage', messageInfo)
    })

    
})