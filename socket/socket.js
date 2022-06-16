const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});



io.on('connection', (socket) => {
    console.log('socket is running on port 8000');

    socket.on('addUser', (userId, userInfo) => {
        console.log(userId);
        console.log(userInfo);
    })
})