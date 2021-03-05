const request = require('request');
const https = require('https');
const fs = require('fs');

exports.sessionsupd = (source) => {

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/system/sessionsupd'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    const auth = "Bearer " + fs.readFileSync('softeng20bAPI.token');
    request({
        url: "https://localhost:8765/admin/system/sessionsupd"
        , method: 'POST'
        , agent: agent
        , headers: {
            "Authorization": auth
            , "Content-Type": "multipart/form-data"
        }
        , formData: {
            "file": fs.createReadStream(source)
        }
    }, function (err, resp, body) {
        console.log(JSON.parse(body))

    });
}