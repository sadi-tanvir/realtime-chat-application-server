const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

let users = []

const addUser = (userId, socketId, userInfo) => {
   const isUserExist = users.some(user => user.userId === userId)
   console.log(isUserExist);
   if(!isUserExist){
    users.push({userId, socketId, userInfo})
   }
}

io.on('connection', (socket) => {
    console.log('socket is running on port 8000');

    socket.on('addUser', (userId, userInfo) => {
        addUser(userId, socket.id, userInfo)
        io.emit('getUsers', users)
    })
})