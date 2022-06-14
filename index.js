const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

// components
require('./config/db')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')

// middleware
app.use(cors())
app.use(express.json())


// routes
app.use(userRoutes)
app.use(messageRoutes)



app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})