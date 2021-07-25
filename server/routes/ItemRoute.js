const express = require('express');
const Item = require('../model/ItemModel');
const router = express();

router.post('/post-item', (req, res) => {
    let item = new Item({
        name: name,
        quantity: quant,
        description: desc
    })
    item.save()
        .then((result) => { res.send(result) })
        .catch((err) => { console.log(`error saving to db: ${err}`) })
});

router.get('/get-item', (req, res) => {
    Item.find()
        .then((result) => { res.send(result) })
        .catch((err) => { console.log(`error in GET: ${err}`) })
});

router.get('/new-item', (req, res) => {
    let item = new Item({
        name: 'book',
        quantity: 5,
        description: 'novel'
    })
    item.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(`error saving new item to mongo: ${err}`))
});

module.exports = router;