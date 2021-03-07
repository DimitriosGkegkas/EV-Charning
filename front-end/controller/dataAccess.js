const https = require('https')
const request =require('request')


exports.perStation =(req, res, next) => {

    const stationID = req.query.ID
    const periodFrom = req.query.dateFrom
    const periodTo = req.query.dateTo

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
    const pointID = req.query.ID
    const periodFrom = req.query.dateFrom
    const periodTo = req.query.dateTo

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
        res.render( "sessions", { "per":"point" ,"body":JSON.parse(body)})
    });
}


exports.perEV =(req, res, next) =>{
    const evID = req.query.ID
    const periodFrom = req.query.dateFrom
    const periodTo = req.query.dateTo

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
    const providerID = req.query.ID
    const periodFrom = req.query.dateFrom
    const periodTo = req.query.dateTo

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

exports.viewData= (req, res, next)=>{
    res.render("view-data",{body:{}})
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