const express = require("express")
const cors = require('cors');
const connectToDb = require("./src/db/db.js")
const SongRouter = require("./src/routers/songRouter.js")

const app = express()
app.use(express.json())
app.use(cors())
const port = 3000;

app.use('/songs', SongRouter)



connectToDb();
app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})
