const express = require('express');
const route = express.Router();
const usage = require("./../controller/maxUsageController")
const auth= require("./../controller/auth")

// GET: Chart
route.get('/maxUsage',usage.maxUsage);

module.exports = route;