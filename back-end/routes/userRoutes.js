const userController = require("./../controller/userController")
const express = require('express');
const route = express.Router();
const isAuth = require('./../controller/is-auth')



// POST: User Login
route.post('/login',userController.login);

// POST: User Logout
route.post('/logout',userController.logout);



// POST: Create User
route.post('/admin/usermod',isAuth,userController.signup);

// GET: Get a user
route.get('/admin/users/:username',isAuth,userController.getuser);

module.exports= route;