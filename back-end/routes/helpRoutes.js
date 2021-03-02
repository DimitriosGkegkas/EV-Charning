const express = require('express');
const route = express.Router();
const help= require("./../controller/helpController")




// GET: Get healthcheck
route.get('/admin/healthcheck',help.healthcheck);

// POST: Reset sessions
route.post('/admin/resetsessions',help.resetsessions);


module.exports = route;