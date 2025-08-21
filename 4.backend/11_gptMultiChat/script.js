const app = require('./src/app');
const {createServer} = require('http');
const connectToDb = require('./src/db/db');

const httpServer = createServer(app);
connectToDb()

httpServer.listen(3000,()=>{
    console.log('server is running on port 3000')
})

