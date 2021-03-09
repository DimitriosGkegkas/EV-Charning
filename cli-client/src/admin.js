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
        , headers: {
            "Authorization": auth
        }
        , json: jsonObject
        , agent: agent
    }, function (err, resp, body) {


        if(err){
            console.log(err.message)
        }
        else{
        console.log(body.message)
        console.log("API key: " + body.apiKey)
        }



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
            console.log("API key: " + JSON.parse(body).apiKey)
        }

;
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
    let auth;
    try { auth = "Bearer " + fs.readFileSync('softeng20bAPI.token'); }
    catch { 
        console.log("Access Denied")
        return
    }
    if (!fs.existsSync(source)) {
        console.log("Please Check Your File Path")
        return
    }
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



        console.log("The file had " + JSON.parse(body).SeassionsInUploadedFile + " sessions \nand " + JSON.parse(body).SessionsImported + " were uploaded in the database. \nThe database now containes " + JSON.parse(body).TotalSeassionsInDatabase + " sessions")
        if (err) { console.log(err.message) }

    });
}