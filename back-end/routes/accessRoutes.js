const express = require('express');
const route = express.Router();
const admin = require('./../controller/is-admin')


route.use("/",admin.hasUsage);
route.use("/admin",admin.isAdmin);

module.exports= route;