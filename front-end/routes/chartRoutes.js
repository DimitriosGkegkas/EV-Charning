const express = require('express');
const route = express.Router();
const chart = require("./../controller/chartController")
const auth= require("./../controller/auth")

// GET: Chart
route.get('/chart',chart.chart);

module.exports = route;