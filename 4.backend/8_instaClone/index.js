const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const connectToDb = require("./src/db/db.js")

const app= express();
const port = 3000;


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

connectToDb();
app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})