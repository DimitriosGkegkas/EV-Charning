const express = require ('express');
const app = express();
const loginRoutes = require("./routes/loginRoutes");

app.set("view engine","ejs");
app.set("views","view");

app.use(loginRoutes);

app.listen(3000);