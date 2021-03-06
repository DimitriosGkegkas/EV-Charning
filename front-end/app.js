const express = require ('express');
const app = express();
const loginRoutes = require("./routes/loginRoutes");
const homeRoutes = require("./routes/homeRoutes");
const dataAccessRoutes = require("./routes/dataAccessRoutes");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type, Authorization');
    next();
}
)

app.set("view engine","ejs");
app.set("views","view");


app.use(logoutRoutes);
app.use(loginRoutes);
app.use(homeRoutes);
app.use(dataAccessRoutes);
app.use(adminRoutes);

app.listen(3000);