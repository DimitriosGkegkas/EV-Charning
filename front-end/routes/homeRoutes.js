const express = require('express');
const route = express.Router();
const homeController= require("./../controller/homeController")
const auth= require("./../controller/auth")


route.get('/homepage',auth.check,homeController.home);

module.exports = route;