const express = require('express');
const route = express.Router();
const sessionController= require("./../controller/sessionController")



// GET: Get SessionPerPoint
route.get('/SessionPerPoint/:PointID/:PeriodFrom/:PeriodTo',sessionController.SessionPerPoint);

// GET: Get SessionPerStation
route.get('/SessionPerStation/:StationID/:PeriodFrom/:PeriodTo',sessionController.SessionPerStation);


// GET: Get SessionPerEV
route.get('/SessionPerEV/:VehicleID/:PeriodFrom/:PeriodTo',sessionController.SessionPerEV);

// GET: Get SessionPerProvider
route.get('/SessionPerProvider/:ProviderID/:PeriodFrom/:PeriodTo',sessionController.SessionPerProvider);

module.exports =route;