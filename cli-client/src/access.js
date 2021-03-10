const request = require('request');
const https = require('https');
const fs = require('fs');






exports.login = (username, password, apikey) => {
    const jsonObject =
    {
        "username": username,
        "password": password
    }
    
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
        , headers: {
            "x-api-key": apikey
        }
    }, function (err, resp, body) {
        if (body.message) { console.log(body.message) }
        if (err) { console.log(err.message) }
        if(body.token){
            console.log("token: "+body.token)
            try {
                fs.writeFile("softeng20bAPI.token", body.token, (err, result) => { })
                console.log("Token Saved in File")
            }

            catch {
                { console.log("Could not Save Token") }
            }
        }
        else {
            console.log("Not Auth")
        }   
        }
    );
}

exports.logout = (apikey) => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/logout'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    let auth
    try {auth= "Bearer "+fs.readFileSync('softeng20bAPI.token');
    }
    catch{
        console.log("Access denied")
        return
    }
    request({
        url: "https://localhost:8765/logout"
        , method: 'POST'
        , headers: {
            "Authorization": auth,
            "x-api-key": apikey

        }
        , agent: agent
    }, function (err, resp, body) {
        console.log(body)
        fs.unlinkSync("softeng20bAPI.token", body.token, (err, result) => { })
    });
}