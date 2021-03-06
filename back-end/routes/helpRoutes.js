const express = require('express');
const route = express.Router();
const help= require("./../controller/helpController")
const auth= require("./../controller/is-auth")
const userController = require("./../controller/userController")

// GET: Get auth
route.get('/auth',auth.authCheck);

// POST: User Login
route.post('/login',userController.login);

// GET: Get healthcheck
route.get('/admin/healthcheck',help.healthcheck);


// POST: Reset sessions
route.post('/admin/resetsessions',help.resetsessions);


module.exports = route;