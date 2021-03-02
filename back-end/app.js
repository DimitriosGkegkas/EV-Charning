const mongoose = require('mongoose');
const databaseURL = require('./database/auth');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const userRoute = require("./routes/userRoutes");
const fileRoute = require("./routes/fileUploadRoutes");



app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileRoute);
app.use(userRoute );


app.listen(8765);

mongoose.connect(databaseURL.URL, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(
        result => {
           
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    );


