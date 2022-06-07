const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

// components
require('./config/db')
const userRoutes = require('./routes/userRoutes')

// middleware
app.use(cors())
app.use(express.json())


// routes
app.use(userRoutes)





app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})