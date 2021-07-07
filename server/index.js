const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
const uri = 'mongodb://127.0.0.1:27017/test';

// connect to mongo
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(
        app.listen(PORT, () => {
            console.log(`app connected to MONGODB and running on port: ${PORT}!`)
        })
    )
    .catch((err) => (
        console.log(`db connection failed: ${err}`)
    ))


