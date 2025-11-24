const express = require('express')
require('dotenv').config();
PORT = process.env.PORT


const app = express()
app.use(express.json())


app.listen(PORT,() => {
    console.log(`Server running ${PORT} port`)
})