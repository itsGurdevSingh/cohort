const app = require("./src/app.js");
const {createServer} = require('http');
const connectToDb = require("./src/db/db.js");
const setupSocketServer = require("./src/socket/socket.js");


const httpServer = createServer(app);

connectToDb();

setupSocketServer(httpServer);

httpServer.listen(3000,()=>{
    console.log('server is running on port 3000');
})

