const https = require('https')
const request =require('request')


exports.perStation =(req, res, next) => {

    const stationID = req.params.StationID
    const periodFrom = req.params.PeriodFrom
    const periodTo = req.params.PeriodTo

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
        res.render( "sessions", { "per":"station" ,"body":body})
    });
}

exports.perPoint =(req, res, next) =>{
    const pointID = req.params.PointID
    const periodFrom = req.params.PeriodFrom
    const periodTo = req.params.PeriodTo

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
        , agent: agent
    }, function (err, resp, body) {
        res.render( "sessions", { "per":"point" ,"body":body})
    });
}


exports.perEV =(req, res, next) =>{
    const evID = req.params.VehicleID
    const periodFrom = req.params.PeriodFrom
    const periodTo = req.params.PeriodTo

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
        res.render( "sessions", { "per":"ev" ,"body":body})
    });
}



exports.perProvider=(req, res, next) =>{
    const providerID = req.params.ProviderID
    const periodFrom = req.params.PeriodFrom
    const periodTo = req.params.PeriodTo

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
        res.render( "sessions", { "per":"provider" ,"body":body})
    });

}

