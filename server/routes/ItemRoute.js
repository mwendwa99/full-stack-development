const express = require('express');
const Item = require('../model/ItemModel');
const router = express.Router();
const cors = require('cors');

// cors options
var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// post item from frontend
router.route('/post-item').post((req, res, next) => {
    Item.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// get all items
router.route('/get-item').get((req, res) => {
    Item.find()
        .then((result) => { res.send(result) })
        .catch((err) => { console.log(`error in GET: ${err}`) })
});

// find by ID
router.route('item/:id').get((req, res) => {
    Item.findByID(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => console.log(`error in findById: ${err}`))
});

// delete by ID
router.route('delete/:id').delete((req, res) => {
    Item.findByIdAndRemove(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => console.log(`error in deleteById: ${err}`))
})

module.exports = router;