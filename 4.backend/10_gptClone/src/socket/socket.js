const {server} = require('socket.io')

const setupSocketServer = (httpServer) =>{
    const io = new server(httpServer)

    io.on('connection',()=>{
        console.log('yoo socket is connected')
    })

}

module.exports = setupSocketServer