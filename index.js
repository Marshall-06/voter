const express = require('express')
require('dotenv').config();
PORT = process.env.PORT


const app = express()
app.use(express.json())

const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/group')
const teacherRouter = require('./routes/teacher')
const rateRouter = require('./routes/rate')
const questionRouter = require('./routes/question')



app.use('/api/auth',authRouter)
app.use('/api/group', categoryRouter);
app.use('/api/teacher', teacherRouter);
app.use("/api/rate", rateRouter);
app.use("/api/question", questionRouter);




app.listen(PORT,() => {
    console.log(`Server running ${PORT} port`)
})