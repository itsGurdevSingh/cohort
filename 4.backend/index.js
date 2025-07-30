const http = require('http');

const server = http.createServer((req,res)=>{
    res.end('server is working ')
})

const port = 3000;

server.listen(3000,()=>{
    console.log(`server is running on port ${port}`)
})