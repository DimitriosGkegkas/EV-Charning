const request = require('request');
const https = require('https');

exports.login = (username, password) => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/login'
        , json: {"username": username,
                "password": password}
        , rejectUnauthorized: false
    };

    const agent = new https.Agent(agentOptions);

    request({
        url: "https://localhost:8765/login"
        , method: 'POST'
        , agent: agent
    }, function (err, resp, body) {
        console.log(body)
    });
}