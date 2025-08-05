const express = require("express")
const connectToDb = require("./src/db/db.js")
const dummyroute = require("./src/routes/dummy.route.js")

const app = express()

const port = 3000;
app.use(express.json()) // midleware 
app.use('/' , dummyroute)

connectToDb();
app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})