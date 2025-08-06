const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const connectToDb = require('./src/db/db.js')
const userRouter = require('./src/routes/user.router.js')

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/user',userRouter)


connectToDb()
app.listen(port, ()=>{
    console.log(`server is running on port : ${port}`)
})

