const router = require('express').Router();
let data = require('../data')
const Aktor = require('../data/data-model')

router.get('/', (req, res) => {
    Aktor.findAktorler()
        .then(data => res.json(data))
        .catch((error) =>
            next({
                statusCode: 500,
                errorMessage: "hata mesajı",
                error
            }))
    //res.send(data);
    // res.status(200).json(data)
})

router.delete('/:id', (req, res) => {

    const { id } = req.params;
    Aktor.deleteAktor(id)
        .then((cevap) => {
            if (cevap) {
                res.status(201).json({ "cevap": "silindi" })
            } else {
                res.status(501).json({ "cevap": "NAAHHH" })
            }

        })

    /*
        const deleted_data = data.find(d => d.id === parseInt(id))
        if (deleted_data) {
            data = data.filter(liste => liste.id !== parseInt(id))
            res.send(data)
        } else {
            res.json({ "errorMessage": "yok gardes ole bisey" })
        }
        */
})

router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    // console.log("id bee: ", req.body)
    Aktor.updateAktor(req.body, id)
        .then(response => {
            res.status(201).json(response)
        }).catch(error => {
            next({
                statusCode: 501,
                errorMessage: 'patch olmadı bee'
            })
        })
})

router.get('/:id', (req, res) => {


    const { id } = req.params;

    Aktor.findAktorById(id)
        .then(response => res.status(200).json(response))
    // const cevap = data.filter(liste => liste.id === parseInt(id))

    // if (cevap.length > 0) {
    //     res.status(201).json(cevap).end();
    // } else {
    //     res.status(404).send('böyle bir veri yok')
    // }
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