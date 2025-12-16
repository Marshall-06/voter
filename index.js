const express = require('express')
require('dotenv').config();
PORT = process.env.PORT
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const path = require("path");


const app = express()
app.use(express.json())

const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/group')
const teacherRouter = require('./routes/teacher')
const rateRouter = require('./routes/rate')
const questionRouter = require('./routes/question')


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/auth',authRouter)
app.use('/api/group', categoryRouter);
app.use('/api/teacher', teacherRouter);
app.use("/api/rate", rateRouter);
app.use("/api/question", questionRouter);


app.use(express.static("frontend"));

app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "frontend/index.html"));
});


app.listen(PORT,() => {
    console.log(`Server running ${PORT} port`)
})