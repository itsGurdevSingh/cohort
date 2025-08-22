require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const {Server} = require('socket.io');
const userModel = require('../models/user.model');
const genTextRes = require('../services/textGen.service');

const isUserLogedIn = async (socket,next)=>{
    const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
    const token = cookies.authToken

    if(!token) {
        next(new Error('authentication Error : login again'));
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded.id);

        socket.user = user;

        next();

    } catch (error) {

        console.log(error)
        next(new Error('authentication Error : invalid token'))
    }
}

const setUpSocket = (httpServer) =>{
    const io = new Server(httpServer,{});

    io.use(isUserLogedIn)
    io.on('connection',(socket)=>{
        console.log('yoo socket is connected by : \n\n ',socket.user)

        socket.on('user-msg',async(input)=>{
            console.log('input msg is : ',input)
            const res = await genTextRes(input)

            socket.emit('ai-res',res)
        })
    })


}

module.exports = setUpSocket;