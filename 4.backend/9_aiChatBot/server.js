const app = require("./src/app")
const {createServer} = require("http")
const {Server} = require("socket.io")
const generateResponse = require("./src/services/aiTextGen.js")

const httpServer = createServer(app)

const io = new Server(httpServer)

io.on("connection",(socket)=>{
    console.log("socket is connected yoo")

    socket.on("msg",async msg=> {
        console.log("msg : ",msg)

        const response = await generateResponse(msg)

        socket.emit("res", response)
    })



    socket.on("disconnect",()=>console.log('is disconnected buddy '))
})




httpServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})