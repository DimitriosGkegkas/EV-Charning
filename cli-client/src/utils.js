const request = require('request');
const https = require('https');

exports.healthcheck = () => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/healthcheck'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/admin/healthcheck"
        , method: 'GET'
        , agent: agent
    }, function (err, resp, body) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("status: " + JSON.parse(body).status)
        }
    });
}


exports.resetSessions = () => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/resetsessions'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/admin/resetsessions"
        , method: 'POST'
        , agent: agent
    }, function (err, resp, body) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("status: " + JSON.parse(body).status)
        }
    });
}
