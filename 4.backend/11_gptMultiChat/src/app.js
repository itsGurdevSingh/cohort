const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const authRouter = require('./routers/auth.router')

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use(cookieParser());

app.use('/auth',authRouter)

module.exports = app;


