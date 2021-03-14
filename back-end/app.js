const mongoose = require('mongoose');
const databaseURL = require('./database/auth');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const userRoute = require("./routes/userRoutes");
const fileRoute = require("./routes/fileUploadRoutes");
const helpRoute = require("./routes/helpRoutes");
const sesssionRoute = require("./routes/sessionRoutes");
const accessRoute = require("./routes/accessRoutes");
const https = require('https')
const fs = require('fs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type, Authorization');
    next();
}
)

app.use(helpRoute);

app.use(accessRoute);

app.use(userRoute);

app.use(fileRoute);
app.use(sesssionRoute);

app.use((req,res,next)=>{
    res.status(404).json({message:"Page not found"})
})


https.createServer({
    key: fs.readFileSync('database/server.key'),
    cert: fs.readFileSync('database/server.cert')
  }, app).listen(8765)




mongoose.connect(databaseURL.URL, { useNewUrlParser: true , useUnifiedTopology: true })
    .catch(
        err => { console.log(err);});


