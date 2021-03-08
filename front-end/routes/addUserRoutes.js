const express = require('express');
const route = express.Router();
const homeController= require("./../controller/addUserController")



route.get('/AddUser',addUserController.addUser);

module.exports = route;