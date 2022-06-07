const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

// components
require('./config/db')


// middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('backend is ready to run')
})


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})