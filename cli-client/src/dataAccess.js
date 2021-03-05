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


exports.perEV = (ev, datefrom, dateto) =>{

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerEV'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/SessionPerEV/"+ev+"/"+datefrom+"/"+dateto
        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        console.log( JSON.parse(body))
    });
}



exports.perProvider = (provider, datefrom, dateto) =>{

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerProvider'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/SessionPerProvider/"+provider+"/"+datefrom+"/"+dateto

        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        console.log( JSON.parse(body))
    });

}

