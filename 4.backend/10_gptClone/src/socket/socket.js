const {Server} = require('socket.io')
const genText = require('../services/aiGenText.service.js')

const setupSocketServer = (httpServer) =>{
    const io = new Server(httpServer)

    io.on('connection',(socket)=>{
        console.log('yoo socket is connected')

        socket.on('user-msg',async(input)=>{
            const res = await genText(input);
            socket.emit('bot-msg',res);
        })

    })

}

module.exports = setupSocketServer