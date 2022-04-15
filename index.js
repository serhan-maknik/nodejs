const http = require('http');
const express = require('express');
const aktorlerRouter = require('./routers/aktorlerRouter')

const server = express();
server.use(express.json())
server.use('/aktorler', aktorlerRouter)

server.get('/', (req, res) => {
    res.send('Express is görüyor')
})



let count = 4
server.post("/post", (req, res) => {
    let datas = req.body
    datas.id = count;
    data.push(datas);
    count++;
    console.log("cevap: ", data)
    res.send(data);
})

server.listen(5000, () => {

    console.log("dinliyoruz abi")
})
