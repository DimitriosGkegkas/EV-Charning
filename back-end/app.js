const mongoose = require('mongoose');
const databaseURL = require('./database/auth');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const userRoute = require("./routes/userRoutes");
const multer = require('multer');
const fileUpload = require("./controller/fileUploadController");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: fileUpload.storage, fileFilter: fileUpload.csvFilter }).single("CSV"));

app.use(userRoute );




mongoose.connect(databaseURL.URL, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(
        result => {
            app.listen(8765);
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    );


