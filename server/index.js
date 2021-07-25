const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/ItemRoute');
const cors = require('cors');;
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const uri = 'mongodb://127.0.0.1:27017/test';

// enable cors
app.use(cors());

// parse requests of content type application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// item route middleware
app.use('/item', itemRoutes);

// connect to mongo
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    app.listen(PORT, () => {
        console.log(`app connected to mongodb: ${uri} and running on port: ${PORT}!`)
    })
).catch((err) => (
    console.log(`db connection failed: ${err}`)
));





