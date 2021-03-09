const https = require('https')
const request =require('request')

exports.chart = (req, res, next) => {
    
    const pointID = "CA-311"
    const periodFrom = "2019-06-01 00:00:00"
    const periodTo = "2019-12-01 00:00:00"

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
        res.render( "sessionsPerPoint", { "per":"point" ,"body":JSON.parse(body)})

        const returnList =[];
        for (row in JSON.parse(body).ChargingSessionsList){
            returnList.push({ "x":row.SessionIndex,"y":row.EnergyDelivered})

        }


    res.render("chart",{kwh:returnList})


});
}