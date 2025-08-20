const {Server} = require('socket.io')

const setupSocketServer = (httpServer) =>{
    const io = new Server(httpServer)

    io.on('connection',()=>{
        console.log('yoo socket is connected')
    })

}

module.exports = setupSocketServer