const userController = require("./../controller/userController")
const express = require('express');
const route = express.Router();



// POST: Create User
route.post('/admin/usermod',userController.signup);

// GET: Get a user
route.get('/admin/users/:username',userController.getuser);

// POST: User Login
route.post('/login',userController.login);

// POST: User Logout
route.post('/logout',userController.logout);

module.exports= route;