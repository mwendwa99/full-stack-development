const express = require('express');
const Item = require('../model/ItemModel');
const router = express.Router();

// post item from frontend
router.route('/post-item').post((req, res, next) => {
    Item.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(`data from frontend: ${data}`)
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
        .then((res) => res.send(result))
        .catch((err) => console.log(`error in findById: ${err}`))
})

module.exports = router;