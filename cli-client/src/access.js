const request = require('request');
const https = require('https');
const fs =require('fs');


exports.login = (username, password) => {
    const jsonObject = 
        {"username": username,
        "password": password}
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/login'
 
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/login"
        , method: 'POST'
        , json: jsonObject 
        , agent: agent
    }, function (err, resp, body) {
        console.log( body)
        fs.writeFile("softeng20bAPI.token", body.token, (err,result) =>{})

    });
}
