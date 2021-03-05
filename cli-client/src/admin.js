const request = require('request');
const https = require('https');
const fs = require('fs');

exports.Admin = (username, password) => {
    const jsonObject =
    {
        "username": username,
        "password": password
    }
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/usermod'

        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    const auth = "Bearer " + fs.readFileSync('softeng20bAPI.token');
    request({
        url: "https://localhost:8765/admin/usermod"
        , method: 'POST'
        , headers: {
            "Authorization": auth
        }
        , json: jsonObject
        , agent: agent
    }, function (err, resp, body) {
        console.log(body)


    });
}

exports.findUser = (username) => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/users/' + username

        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    let token
    try {
        token = fs.readFileSync('softeng20bAPI.token');
    }
    catch {
        console.log("Access Denied")
        return
    }
    const auth = "Bearer " + token;

    request({
        url: "https://localhost:8765/admin/users/" + username
        , method: 'GET'
        , headers: {
            "Authorization": auth
        }
        , agent: agent
    }, function (err, resp, body) {
        if (err) {
            console.log(err.message)
        }
        else if (JSON.parse(body).message === "Not authenticated") {
            console.log(JSON.parse(body).message)
        }
        else if (!JSON.parse(body).username) {
            console.log("Please insert a correct username")
        }
        else {
            console.log("username: " + JSON.parse(body).username)
            console.log("token: " + token.toString())
        }
    });
}