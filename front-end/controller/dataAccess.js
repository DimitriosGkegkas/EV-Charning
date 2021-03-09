const https = require('https')
const request =require('request')
const moment =require('moment')

exports.perStation =(req, res, next) => {

    const stationID = req.query.ID
    const periodFrom = moment(Date(req.query.dateFrom)).format("YYYY-MM-DD hh:mm:ss")
    const periodTo = moment(Date(req.query.dateTo)).format("YYYY-MM-DD hh:mm:ss")

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerStation'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    request({
        url: "https://localhost:8765/SessionPerStation/" + stationID +"/"+ periodFrom + "/" + periodTo
        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        if(resp.statusCode!=200){

            res.render( "view-data", { message: "Not Valid Input", body:"",per:""})
            return
        }
        res.render( "sessionsPerStation", { "per":"station" ,"body":JSON.parse(body)})
    });
}

exports.perPoint =(req, res, next) =>{
    const pointID = req.query.ID
    const periodFrom = moment(new Date(req.query.dateFrom)).format("YYYY-MM-DD HH:mm:ss")
    const periodTo = moment(new Date(req.query.dateTo)).format("YYYY-MM-DD HH:mm:ss")

    let token
    try {
        token = req.cookies.token
    }
    catch {
        console.log("Access Denied")
        return
    }
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
            "Authorization": auth
        }
        , agent: agent
    }, function (err, resp, body) {
        if(resp.statusCode!=200){

            res.render( "view-data", { message: "Not Valid Input", body:"",per:""})
            return
        }
        res.render( "sessionsPerPoint", { "per":"point" ,"body":JSON.parse(body)})
    });
}


exports.perEV =(req, res, next) =>{
    const evID = req.query.ID
    const periodFrom = moment(Date(req.query.dateFrom)).format("YYYY-MM-DD hh:mm:ss")
    const periodTo = moment(Date(req.query.dateTo)).format("YYYY-MM-DD hh:mm:ss")

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerEV'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/SessionPerEV/"+evID+"/"+periodFrom +"/"+ periodTo
        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        if(resp.statusCode!=200){
            res.render( "view-data", { message: "Not Valid Input", body:"",per:""})
            return
        }
        res.render( "sessionsPerEV", { "per":"ev" ,"body":JSON.parse(body)})
    });
}



exports.perProvider=(req, res, next) =>{
    const providerID = req.query.ID
    const periodFrom = moment(Date(req.query.dateFrom)).format("YYYY-MM-DD hh:mm:ss")
    const periodTo = moment(Date(req.query.dateTo)).format("YYYY-MM-DD hh:mm:ss")

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerProvider'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/SessionPerProvider/"+providerID+"/"+periodFrom +"/"+ periodTo

        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        if(resp.statusCode!=200){
            res.render( "view-data", { message: "Not Valid Input", body:"",per:""})
            return
        }
        res.render( "sessionsPerProvider", { "per":"provider" ,"body":JSON.parse(body)})
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