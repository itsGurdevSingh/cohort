require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { Server } = require('socket.io');
const userModel = require('../models/user.model');
const genTextRes = require('../services/textGen.service');
const messageModel = require('../models/message.model');

const isUserLogedIn = async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || '');
    const token = cookies.authToken

    if (!token) {
        next(new Error('authentication Error : login again'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById(decoded.id);

        socket.user = user;

        next();

    } catch (error) {

        console.log(error)
        next(new Error('authentication Error : invalid token'))
    }
}

const setUpSocket = (httpServer) => {
    const io = new Server(httpServer, {});

    io.use(isUserLogedIn)
    io.on('connection', (socket) => {
        console.log('yoo socket is connected ')

        socket.on('user-msg', async (messagePayload) => {

            const userId = socket.user._id;
            const { chatId, content } = messagePayload;

            const userMsg = await messageModel.create({ userId, chatId, role: 'user', content })

            const shortTermMemory = await messageModel
                .find({ chatId })                  
                .sort({ createdAt: -1 })           
                .limit(5)                          
                .lean();                           

            // Reverse to oldest → newest, then map
            const formatted = shortTermMemory.reverse().map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            }));

            const res = await genTextRes(formatted)

            const modelMsg = await messageModel.create({ userId, chatId, role: 'model', content: res })


            socket.emit('ai-res', res)
        })
    })


}

module.exports = setUpSocket;