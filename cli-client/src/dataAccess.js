const request = require('request');
const https = require('https');
const fs =require('fs');

exports.perPoint = (point, datefrom, dateto) =>{

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerPoint'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/SessionPerPoint/"+point+"/"+datefrom+"/"+dateto
        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        console.log( JSON.parse(body))

    });
}
