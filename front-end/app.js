const express = require ('express');
const app = express();
const loginRoutes = require("./routes/loginRoutes");
const homeRoutes = require("./routes/homeRoutes");
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine","ejs");
app.set("views","view");



app.use(loginRoutes);
app.use(homeRoutes);

app.listen(3000);