const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

var users = []
console.log(users);

function addUser(userId, socketId, userInfo){
   const isUserExist = users.some(user => user.userId === userId)
   if(!isUserExist){
       console.log(`this is active`);
    users.push({userId, socketId, userInfo})
   }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId) 
}

const findUser = (id) => {
    const ss = users.find(user  => user.userId === id)
    console.log(`findUser`,ss)
    return ss
    
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
        // console.log(messageInfo);
        const isUserActive = findUser(messageInfo.receiverId)
        console.log(`isUserActive: `, isUserActive);
        io.emit('receiveMessage', messageInfo)
    })


    socket.on('typingMessage', (data) => {
        // console.log(data);
        const isUserActive = findUser(data.receiverId)
        socket.broadcast.emit('typingMessageStatus', data)
    })

    
})