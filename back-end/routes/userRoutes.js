const userController = require("./../controller/userController")
const express = require('express');
const route = express.Router();
const auth = require('./../controller/is-auth')



// POST: User Login
route.post('/login',userController.login);

// POST: User Logout
route.post('/logout',auth.isAuth,userController.logout);



// POST: Create User
route.post('/admin/usermod',auth.isAuth,userController.signup);

// GET: Get a user
route.get('/admin/users/:username',auth.isAuth,userController.getuser);

module.exports= route;