const mongoose = require('mongoose');
const databaseURL = require('./database/auth');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const userRoute = require("./routes/userRoutes");
const fileRoute = require("./routes/fileUploadRoutes");
const helpRoute = require("./routes/helpRoutes");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRoute );
app.use(helpRoute );
app.use(fileRoute);


app.listen(8765);

mongoose.connect(databaseURL.URL, { useNewUrlParser: true , useUnifiedTopology: true })
    .catch(
        err => {
            console.log(err);
        }
    );


