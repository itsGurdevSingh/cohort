const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/auth.router.js')

const app = express()
app.set("view engine", "ejs");

app.use(express.json())

app.use('/auth',authRouter)


module.exports = app;