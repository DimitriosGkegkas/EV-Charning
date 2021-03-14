const express = require('express');
const Session = require('../model/session');
const moment = require("moment")


exports.SessionPerPoint = (req, res, next) => {
    const PointID = req.params.PointID;
    const PeriodFrom = req.params.PeriodFrom;
    const PeriodTo = req.params.PeriodTo;

    try{
        
    if(!moment(PeriodFrom, "yyyy-MM-dd HH:mm:ss").isValid()){

        res.status(400).json( {message: "Please check API endpoint \n SessionPerPoint/:pointID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }
    if(!moment(PeriodTo, "yyyy-MM-dd HH:mm:ss").isValid()){
        res.status(400).json( {message: "Please check API endpoint \n SessionPerPoint/:pointID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }
}
catch{
    res.status(400).json( {message: "Please check API endpoint \n SessionPerPoint/:pointID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }


    Session.find({ 'pointID': PointID })
        .where("connectionTime").gte(new Date(PeriodFrom)).lt(new Date(PeriodTo))
        .sort("connectionTime")
        .then((result) => {
            const resultFormated = [];
            let count = 1;
            result.forEach((value) => {
                const valueFormated = {};
                valueFormated["SessionID"] = value["_id"]?value["_id"] :null ;
                valueFormated["SessionIndex"] = count;
                valueFormated["StartedOn"] = value["connectionTime"]?value["connectionTime"] :null ;
                valueFormated["diconnectedOn"] = value["disconnectTime"]?value["disconnectTime"] :null ;
                valueFormated["FinishedOn"] = value["doneChargingTime"]?value["doneChargingTime"] :null ;
                valueFormated["EnergyDelivered"] = value["kWhDelivered"]?value["kWhDelivered"] :null ;
                valueFormated["Payment"] = value["Payment"]?value["Payment"] :null ;
                valueFormated["Protocol"] = value["Protocol"]?value["Protocol"] :null ;
                valueFormated["VehicleType"] = value["VehicleType"] ?value["VehicleType"] :null ;
                count=count+1
                resultFormated.push(valueFormated )
            });
            return resultFormated})
        .then( result=>{
            res.status(200).json({
                Point: PointID,
                PointOperator: null,
                RequestTimestamp: Date.now(),
                PeriodFrom: PeriodFrom,
                PeriodTo: PeriodTo,
                NumberOfChargingSessions: result.length,
                ChargingSessionsList: result,
            })
            return
        })
        .catch( err =>{
            res.status(err.status).json( {message: err.message})
        return
        })
}
exports.SessionPerStation = (req, res, next) => {
    const StationID = req.params.StationID;
    const PeriodFrom = req.params.PeriodFrom;
    const PeriodTo = req.params.PeriodTo;
    if(!moment(PeriodFrom, "YYYY-MM-DD HH:mm:ss").isValid()){
        res.status(400).json( {message: "Please check API endpoint \n SessionPerStation/:StationID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }
    if(!moment(PeriodTo, "YYYY-MM-DD HH:mm:ss").isValid()){
        res.status(400).json( {message: "Please check API endpoint \n SessionPerStation/:StationID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }

    Session.aggregate([
        {
            $match :{
                'stationID': StationID ,
                "connectionTime" : {
                    "$gte" :new Date(PeriodFrom)  ,
                    "$lt" : new Date(PeriodTo)  ,
                }
            }
        },
        {
            $group:
            {
            "_id": "$pointID",
            "PointSessions": { "$sum" : 1 },
            "EnergyDelivered": { "$sum": "$kWhDelivered"},
            }
        }
    ]).then(result =>{
        let TotalEnergyDelivered=0
        let  NumberOfChargingSessions=0
        result.forEach((value) => {
            TotalEnergyDelivered=TotalEnergyDelivered+value["EnergyDelivered"]
            NumberOfChargingSessions=NumberOfChargingSessions+value["PointSessions"]
        })
        res.status(200).json({
            StationID: StationID,
            Operator: null,
            RequestTimestamp: Date.now(),
            PeriodFrom: PeriodFrom,
            PeriodTo: PeriodTo,
            TotalEnergyDelivered:TotalEnergyDelivered,
            NumberOfChargingSessions:NumberOfChargingSessions,
            NumberOfActivePoints:result.length,
            SessionsSummaryList: result,
        })
    })
}




exports.SessionPerEV = (req, res, next) => {
    const VehicleID = req.params.VehicleID;
    const PeriodFrom = req.params.PeriodFrom;
    const PeriodTo = req.params.PeriodTo;
    if(!moment(PeriodFrom, "YYYY-MM-DD HH:mm:ss").isValid()){
        res.status(400).json( {message: "Please check API endpoint \n SessionPerEV/:evID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }
    if(!moment(PeriodTo, "YYYY-MM-DD HH:mm:ss").isValid()){
        res.status(400).json( {message: "Please check API endpoint \n SessionPerEV/:evID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }

    Session.find({ 'userID': VehicleID })
        .where("connectionTime").gt(new Date(PeriodFrom)).lt(new Date(PeriodTo))
        .sort("connectionTime")
        .then((result) => {
            const resultFormated = [];
            let count = 1;
            result.forEach((value) => {
                const valueFormated = {};
                valueFormated["SessionID"] = value["_id"]?value["_id"] :null ;
                valueFormated["SessionIndex"] = count;
                valueFormated["EnergyProvider"] = value["EnergyProvider"]?value["EnergyProvider"] :null ;
                valueFormated["StartedOn"] = value["connectionTime"]?value["connectionTime"] :null ;
                valueFormated["diconnectedOn"] = value["disconnectTime"]?value["disconnectTime"] :null ;
                valueFormated["FinishedOn"] = value["doneChargingTime"]?value["doneChargingTime"] :null ;
                valueFormated["EnergyDelivered"] = value["kWhDelivered"]?value["kWhDelivered"] :null ;
                valueFormated["PointID"] = value["pointID"]?value["pointID"] :null ;
                valueFormated["PricePolicyRef"] = value["pricePolicyRef"]?value["pricePolicyRef"] :null ;
                valueFormated["CostPerKWh"] = value["CostPerKWh"]?value["CostPerKWh"] :null ;
                valueFormated["SessionCost"] = value["sessionCost"] ?value["sessionCost"] :null ;
                count=count+1
                resultFormated.push(valueFormated )
            });
            return resultFormated})
.then( result=>{
            let TotalEnergyConsumed=0
            let  NumberOfVehicleChargingSessions=0
            let  NumberOfVisitedPointsArr=[]
            result.forEach((value) => {
                TotalEnergyConsumed=TotalEnergyConsumed+value["EnergyDelivered"]
                NumberOfVehicleChargingSessions=NumberOfVehicleChargingSessions+1
                NumberOfVisitedPointsArr.push(value["PointID"])
            })
            var distinct = new Set(NumberOfVisitedPointsArr);
            const NumberOfVisitedPoints=distinct.size


            res.status(200).json({
                VehicleID: VehicleID,
                RequestTimestamp: Date.now(),
                PeriodFrom: PeriodFrom,
                PeriodTo: PeriodTo,
                TotalEnergyConsumed:TotalEnergyConsumed,
                NumberOfVehicleChargingSessions:NumberOfVehicleChargingSessions,
                NumberOfVisitedPoints: NumberOfVisitedPoints,
                VehicleChargingSessionList: result,
            })
        });
}

exports.SessionPerProvider = (req, res, next) => {
    const ProviderID = req.params.ProviderID;
    const PeriodFrom = req.params.PeriodFrom;
    const PeriodTo = req.params.PeriodTo;
    if(!moment(PeriodFrom, "yyyy-MM-dd'T'HH:mm:ss").isValid()){
        res.status(400).json( {message: "Please check API endpoint \n SessionPerProvider/:ProviderID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }
    if(!moment(PeriodTo, "YYYY-MM-DD HH:mm:ss").isValid()){
        res.status(400).json( {message: "Please check API endpoint \n SessionPerProvider/:ProviderID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format"})
        return
    }
    Session.find({ 'provider': ProviderID })
        .where("connectionTime").gt(new Date(PeriodFrom)).lt(new Date(PeriodTo))
        .sort("connectionTime")
        .then((result) => {
            const resultFormated = [];
            result.forEach((value) => {
                const valueFormated = {};
                valueFormated["ProviderID"]=ProviderID;
                valueFormated["ProviderName"] = value["ProviderName"] ?value["ProviderName"] :null ;
                valueFormated["SessionID"] = value["_id"]?value["_id"] :null ;
                valueFormated["StationID"] = value["stationID"]?value["stationID"] :null ;
                valueFormated["VehicleID"] = value["userID"]?value["userID"] :null ;
                valueFormated["StartedOn"] = value["connectionTime"]?value["connectionTime"] :null ;
                valueFormated["diconnectedOn"] = value["disconnectTime"]?value["disconnectTime"] :null ;
                valueFormated["FinishedOn"] = value["doneChargingTime"]?value["doneChargingTime"] :null ;
                valueFormated["EnergyDelivered"] = value["kWhDelivered"]?value["kWhDelivered"] :null ;
                valueFormated["PricePolicyRef"] = value["pricePolicyRef"]?value["pricePolicyRef"] :null ;
                valueFormated["CostPerKWh"] = value["CostPerKWh"]?value["CostPerKWh"] :null ;
                valueFormated["TotalCost"] = value["totalCost"] ?value["totalCost"] :null ;

                resultFormated.push(valueFormated )
            });
            return resultFormated})
.then( result=>{
            res.status(200).json({result})
        });
}