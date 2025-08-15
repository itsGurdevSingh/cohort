const app = require("./src/app")
const {createServer} = require("http")
const {Server} = require("socket.io")

const httpServer = createServer(app)

const io = new Server(httpServer)

io.on("connection",(socket)=>{
    console.log("socket is connected yoo")

    socket.on("msg", msg=> {
        console.log("msg : ",msg)
        socket.emit("res","i got you msg buddy ")
    })



    socket.on("disconnect",()=>console.log('is disconnected buddy '))
})




httpServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})