const request = require('request');
const https = require('https');
const fs = require('fs');

exports.SessionsPerStation = (stationID, periodFrom, periodTo) => {
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
        console.log( JSON.parse(body))
    });
}