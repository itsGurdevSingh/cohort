const app = require("./src/app")
const {createServer} = require("http")
const {Server} = require("socket.io")
const generateResponse = require("./src/services/aiTextGen.js")

const httpServer = createServer(app)

const io = new Server(httpServer,{
    cors:"http://localhost:5173/"
})

const chatHistory = [];


io.on("connection",(socket)=>{
    console.log("socket is connected yoo")

    socket.on("msg",async msg=> {

        chatHistory.push({
            role:'user',
            parts:[{text:msg}]
        })

        const response = await generateResponse(chatHistory)

        chatHistory.push({
            role:'model',
            parts:[{text:response}]
        })

        socket.emit("res", response)
    })



    socket.on("disconnect",()=>console.log('is disconnected buddy '))
})




httpServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})