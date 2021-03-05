const request = require('request');
const https = require('https');
const fs =require('fs');

exports.Admin = (username, password) => {
    const jsonObject = 
        {"username": username,
        "password": password}
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/Admin/usermod'
 
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    const auth= "Bearer "+fs.readFileSync('softeng20bAPI.token');
    request({
        url: "https://localhost:8765/Admin/usermod"
        , method: 'POST'
        ,headers : {
            "Authorization" : auth
        }
        , json: jsonObject 
        , agent: agent
    }, function (err, resp, body) {
        console.log( body)
        

    });
}