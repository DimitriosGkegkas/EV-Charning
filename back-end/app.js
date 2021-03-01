const mongoose = require('mongoose');
const databaseURL = require('./database/auth');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));





mongoose.connect(databaseURL.URL, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(
        result => {
            app.listen(8080);
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    );