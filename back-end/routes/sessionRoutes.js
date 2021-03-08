const express = require('express');
const route = express.Router();
const sessionController= require("./../controller/sessionController")
const auth = require('./../controller/is-auth')



// GET: Get SessionPerPoint
route.get('/SessionPerPoint/:PointID/:PeriodFrom/:PeriodTo',auth.isAuth,sessionController.SessionPerPoint);

// GET: Get SessionPerStation
route.get('/SessionPerStation/:StationID/:PeriodFrom/:PeriodTo',auth.isAuth,sessionController.SessionPerStation);


// GET: Get SessionPerEV
route.get('/SessionPerEV/:VehicleID/:PeriodFrom/:PeriodTo',auth.isAuth,sessionController.SessionPerEV);

// GET: Get SessionPerProvider
route.get('/SessionPerProvider/:ProviderID/:PeriodFrom/:PeriodTo',auth.isAuth,sessionController.SessionPerProvider);

module.exports =route;