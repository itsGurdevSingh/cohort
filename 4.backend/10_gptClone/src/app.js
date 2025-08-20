const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const authRouter = require('./routers/auth.router.js')
const indexRouter = require('./routers/index.router.js')

const app = express()
app.set("view engine", "ejs");
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors())

app.use('/auth',authRouter)
app.use('/',indexRouter)


module.exports = app;