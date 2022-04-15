const router = require('express').Router();
let data = require('../data')
router.get('/', (req, res) => {
    //res.send(data)
    res.send(data);
    // res.status(200).json(data)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleted_data = data.find(d => d.id === parseInt(id))
    if (deleted_data) {
        data = data.filter(liste => liste.id !== parseInt(id))
        res.send(data)
    } else {
        res.json({ "errorMessage": "yok gardes ole bisey" })
    }
})

router.get('/:id', (req, res) => {
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

router.post('/:id', (req, res) => {
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

module.exports = router;