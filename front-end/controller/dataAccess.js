const https = require('https')
const request =require('request')
const moment =require('moment')

function getLists (input) {
    let returnListEnergy =[];
    let returnListCount=[];
    let current_day="0";
    let energy_sum=0;
    let session_count=0;
    for (row of input){
        let dt= row.StartedOn.slice(0,10);
        if(current_day === "0") {
            current_day=dt
            session_count=1;
        }
        if(current_day===dt){
            energy_sum = energy_sum +row.EnergyDelivered;
            session_count=session_count+1;
        }
        else{
            
            returnListEnergy.push({ "x":current_day,"y":Number(energy_sum.toFixed(2))})
            returnListCount.push({ "x":current_day,"y":session_count})
            energy_sum=row.EnergyDelivered;  
            session_count=1;
            current_day=dt
        }


    }
    return {returnListEnergy:returnListEnergy,  returnListCount:returnListCount}
}

function getListsStation (input) {
    let returnListEnergy =[];
    let returnListCount=[];
    for (row of input){
        returnListEnergy.push({ "x":row._id,"y":Number(row.EnergyDelivered.toFixed(2))})
        returnListCount.push({ "x":row._id,"y":row.PointSessions})
        }

    return {returnListEnergy:returnListEnergy,  returnListCount:returnListCount}
}

exports.perStation =(req, res, next) => {

    const stationID = req.query.ID
    const periodFrom = moment(new Date(req.query.dateFrom)).format("YYYY-MM-DD hh:mm:ss")
    const periodTo = moment(new Date(req.query.dateTo)).format("YYYY-MM-DD hh:mm:ss")

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerStation'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let apiKey
    try {apiKey = req.cookies.apiKey}
    catch {res.render( "view-data", { message: "Access Denied! Please Try to login again", body:"",per:""})
    return}
    let token
    try {
        token = req.cookies.token
    }
    catch {res.render( "view-data", { message: "Access Denied! Please Try to login again", body:"",per:""})
    return}
    const auth = "Bearer " + token;

    request({
        url: "https://localhost:8765/SessionPerStation/" + stationID +"/"+ periodFrom + "/" + periodTo
        , method: 'GET'
        , agent: agent
        , headers: {
            "Authorization": auth,
            "x-api-key":apiKey
        }
    }, function (err, resp, body) {

        if(resp.statusCode!=200){
            if (resp.statusCode===429) {
                        res.redirect('maxUsage')
                        return
                    }
   
            res.render( "view-data", { message: "Not Valid Input", body:"",per:""})
            return
        }


        let ret = getListsStation ( JSON.parse(body).SessionsSummaryList );
        let returnListEnergy= ret.returnListEnergy
        let returnListCount=ret.returnListCount

 
        res.render( "sessionsPerStation", { "per":"station","body":JSON.parse(body),"kwh":returnListEnergy,"count":returnListCount})
    });
}

exports.perPoint =(req, res, next) =>{
    const pointID = req.query.ID
    const periodFrom = moment(new Date(req.query.dateFrom)).format("YYYY-MM-DD HH:mm:ss")
    const periodTo = moment(new Date(req.query.dateTo)).format("YYYY-MM-DD HH:mm:ss")

    let apiKey
    try {apiKey = req.cookies.apiKey}
    catch {res.render( "view-data", { message: "Access Denied! Please Try to login again", body:"",per:""})
    return}
    let token
    try {
        token = req.cookies.token
    }
    catch {res.render( "view-data", { message: "Access Denied! Please Try to login again", body:"",per:""})
    return}
    const auth = "Bearer " + token;
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerPoint'

        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/SessionPerPoint/"+pointID+"/"+periodFrom+"/"+periodTo
        , method: 'GET'
        , headers: {
            "Authorization": auth,
            "x-api-key":apiKey
        }
        , agent: agent
    }, function (err, resp, body) {
        if(resp.statusCode!=200){
            if (resp.statusCode===429) {
                res.redirect('maxUsage')
                return
            }
            res.render( "view-data", { message: "Not Valid Input", body:"",per:""})
            return
        }
        let ret = getLists ( JSON.parse(body).ChargingSessionsList );
        let returnListEnergy= ret.returnListEnergy
        let returnListCount=ret.returnListCount

 

 

        res.render( "sessionsPerPoint", { "per":"point" ,"body":JSON.parse(body),"kwh":returnListEnergy,"count":returnListCount})
    });
}


exports.perEV =(req, res, next) =>{
    const evID = req.query.ID
    const periodFrom = moment(new Date(req.query.dateFrom)).format("YYYY-MM-DD hh:mm:ss")
    const periodTo = moment(new Date(req.query.dateTo)).format("YYYY-MM-DD hh:mm:ss")

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerEV'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let apiKey
    try {apiKey = req.cookies.apiKey}
    catch {res.render( "view-data", { message: "Access Denied! Please Try to login again", body:"",per:""})
    return}

    let token
    try {
        token = req.cookies.token
    }
    catch {res.render( "view-data", { message: "Access Denied! Please Try to login again", body:"",per:""})
    return}
    const auth = "Bearer " + token;
    request({
        url: "https://localhost:8765/SessionPerEV/"+evID+"/"+periodFrom +"/"+ periodTo
        , method: 'GET'
        , agent: agent
        , headers: {
            "Authorization": auth,
            "x-api-key":apiKey
        }
    }, function (err, resp, body) {
        if(resp.statusCode!=200){
            if (resp.statusCode===429) {
                res.redirect('maxUsage')
                return
            }
            res.render( "view-data", { message: "Not Valid Input", body:"",per:""})
            return
        }

        let ret = getLists ( JSON.parse(body).VehicleChargingSessionList );
        let returnListEnergy= ret.returnListEnergy
        let returnListCount=ret.returnListCount
  
        res.render( "sessionsPerEV", { "per":"ev" ,"body":JSON.parse(body),"kwh":returnListEnergy,"count":returnListCount})
    });
}



exports.perProvider=(req, res, next) =>{
    const providerID = req.query.ID
    const periodFrom = moment(new Date(req.query.dateFrom)).format("YYYY-MM-DD hh:mm:ss")
    const periodTo = moment(new Date(req.query.dateTo)).format("YYYY-MM-DD hh:mm:ss")

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerProvider'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let apiKey
    try {apiKey = req.cookies.apiKey}
    catch {res.render( "view-data", { message: "Access Denied! Please Try to login again", body:"",per:""})
    return}
    let token
    try {
        token = req.cookies.token
    }
    catch {res.render( "view-data", { message: "Access Denied! Please Try to login again", body:"",per:""})
    return}
    const auth = "Bearer " + token;
    request({
        url: "https://localhost:8765/SessionPerProvider/"+providerID+"/"+periodFrom +"/"+ periodTo

        , method: 'GET'
        , agent: agent
        , headers: {
            "Authorization": auth,
            "x-api-key":apiKey
        }
    }, function (err, resp, body) {
        if(resp.statusCode!=200){
            if (resp.statusCode===429) {
                res.redirect('maxUsage')
                return
            }
            console.log(body)
            res.render( "view-data", { message: "Not Valid Input", body:"",per:""})
            return
        }
        console.log(body)
        res.render( "sessionsPerProvider", { "per":"provider" ,"body":JSON.parse(body).result})
    });

}

exports.viewData= (req, res, next)=>{
    res.render("view-data",{body:{},message:""})
}



exports.retrieveData= (req, res, next)=>{
    const per = req.query.per
    switch(per){
        case("point"):
            this.perPoint(req, res, next)
            break;
        case("station"):
            this.perStation(req, res, next)
            break;   
        case("ev"):
            this.perEV(req, res, next)
            break;
        case("provider"):
            this.perProvider(req, res, next)
            break;
    }
}