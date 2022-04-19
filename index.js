const express = require('express');
const aktorlerRouter = require('./routers/aktorlerRouter')
const Aktor = require('./data/data-model')
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
    const datas = req.body
    console.log("HANANANA: ", datas)
    if (datas.isim) {
        Aktor.addAktor(datas)
            .then(aktor => res.send(aktor))
            .catch(error => {
                next({
                    error,
                    statusCode: 501,
                    errorMessage: "Ekleyemedik",
                })
            })

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
