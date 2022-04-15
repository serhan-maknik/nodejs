const http = require('http');
const express = require('express');
let data = require('./data')

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Express is görüyor')
})

server.get('/aktorler', (req, res) => {
    //res.send(data)
    res.send(data);
    // res.status(200).json(data)
})

server.delete('/aktorler/:id', (req, res) => {
    const { id } = req.params;
    const deleted_data = data.find(d => d.id === parseInt(id))
    if (deleted_data) {
        data = data.filter(liste => liste.id !== parseInt(id))
        res.send(data)
    } else {
        res.json({ "errorMessage": "yok gardes ole bisey" })
    }
})

server.get('/aktorler/:id', (req, res) => {
    console.log("request: ", req.query)
    console.log(req.query.soyisim)

    const { id } = req.params;
    const cevap = data.filter(liste => liste.id === parseInt(id))

    if (cevap.length > 0) {
        res.status(201).json(cevap).end();
    } else {
        res.status(404).send('böyle bir veri yok')
    }
    //res.json(data.filter(liste => liste.id == req.params.id));
    // res.send(cevap);
})

server.post('/aktorler/:id', (req, res) => {
    const request = req.body;
    const control = data.find(list => list.id === parseInt(request.id))

    if (control) {
        data = data.map(list => list.id === parseInt(request.id)
            ? request
            : list)
        res.json(data)
    } else {
        res.json({ "errorMesage": "boyle bir kullanıcı yok" })
    }
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
