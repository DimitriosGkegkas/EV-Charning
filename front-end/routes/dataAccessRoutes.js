const express = require('express');
const route = express.Router();
const dataAccess = require("./../controller/dataAccess")
const auth= require("./../controller/auth")


// GET: Get SessionPerPoint
route.get('/SessionPerPoint/:PointID/:PeriodFrom/:PeriodTo',auth.check,dataAccess.perPoint);

// GET: Get SessionPerStation
route.get('/SessionPerStation/:StationID/:PeriodFrom/:PeriodTo',auth.check,dataAccess.perStation);


// GET: Get SessionPerEV
route.get('/SessionPerEV/:VehicleID/:PeriodFrom/:PeriodTo',auth.check,dataAccess.perEV);

// GET: Get SessionPerProvider
route.get('/SessionPerProvider/:ProviderID/:PeriodFrom/:PeriodTo',auth.check,dataAccess.perProvider);


module.exports = route;
