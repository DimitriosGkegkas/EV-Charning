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
        , path: '/admin/usermod'
 
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
        url: "https://localhost:8765/admin/usermod"
        , method: 'POST'
        ,headers : {
            "Authorization" : auth
        }
        , json: jsonObject 
        , agent: agent
    }, function (err, resp, body) {
        if(err){
            console.log(err.message)
        }
        else{
        console.log(body.message)
        }

    });
    }

exports.findUser = (username) => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/users/'+username
 
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    const auth= "Bearer "+fs.readFileSync('softeng20bAPI.token');
    request({
        url: "https://localhost:8765/admin/users/"+username
        , method: 'GET'
        ,headers : {
            "Authorization" : auth
        }
        , agent: agent
    }, function (err, resp, body) {
        console.log( body)
    }
    )
}


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