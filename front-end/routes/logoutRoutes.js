const express = require('express');
const route = express.Router();
const logoutController= require("./../controller/logoutController")



route.get('/logout',logoutController.logout);

module.exports = route;