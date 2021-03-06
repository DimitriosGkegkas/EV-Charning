const express = require('express');
const route = express.Router();
const homeController= require("./../controller/homeController")



route.get('/homepage',homeController.home);

module.exports = route;