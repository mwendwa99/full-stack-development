const express = require('express');
const Item = require('../model/ItemModel');
const router = express();

router.post('/post-item', (req, res) => {
    let item = new Item({
        name: 'keys',
        quantity: 3,
        description: 'house keys'
    });
    item.save()
        .then((result) => { res.send(result) })
        .catch((err) => { console.log(`error saving to db: ${err}`) })
});

router.get('/get-item', (req, res) => {
    Item.find()
        .then((result) => { res.send(result) })
        .catch((err) => { console.log(`error in GET: ${err}`) })
})

module.exports = router;