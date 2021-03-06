const express = require('express');
const route = express.Router();
const loginController= require("./../controller/loginController")



route.get('/login',loginController.login);
route.post('/login',loginController.loginPost);

module.exports = route;
