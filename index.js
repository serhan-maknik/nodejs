const express = require('express');
const aktorlerRouter = require('./routers/aktorlerRouter')

let data = require('./data')

const logger = require('./middlewares/logger')
const errorHandling = require('./middlewares/errorHandling')

const server = express();

server.use(express.json())

server.use(logger)


server.use('/aktorler', aktorlerRouter)

server.get('/', (req, res) => {
    res.send('Express is görüyor')
})

let count = 4
server.post("/post", (req, res, next) => {
    let datas = req.body
    if (datas.isim) {
        datas.id = count;
        data.push(datas);
        count++;
        console.log("cevap: ", data)
        res.send(data);
    } else {
        next({
            statusCode: 400,
            errorMessage: "Aktor eklemek için isim girmelisiniz",
        })
    }


})


//bunu her zaman en altta listenin üstünde tutuyoruz 
server.use(errorHandling)

server.listen(5000, () => {

    console.log("dinliyoruz abi")
})
