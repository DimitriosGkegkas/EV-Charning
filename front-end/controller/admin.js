const request = require('request');
const https = require('https');
const fs = require('fs');

exports.Admin = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

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


    let token
    try {
        token = req.cookies.token
    }
    catch {
        console.log("Access Denied")
        return
    }
    const auth = "Bearer " + token;
    

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
            res.render("reportBack",{message:err.message})
        }
        else{
            
            res.render("reportBack",{message:body.message})
        }
    });
    }

exports.findUser = (req, res, next) => {
    const username = req.params.username
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/users/' + username

        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let token
    try {
        token = req.cookies.token
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
            res.render("errorPage",{message:err.message})
        }
        else if (JSON.parse(body).message === "Not authenticated") {
            console.log(JSON.parse(body).message)
        }
        else if (!JSON.parse(body).username) {
            console.log("Please insert a correct username")
        }
        else {
            res.render("successPage",{body:body})
        }


    }
    )
}


exports.sessionsupd =  (req, res, next) => {

    const source = req.file.path;
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/system/sessionsupd'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    let token
    try {
        token = req.cookies.token
    }
    catch {
        console.log("Access Denied")
        return
    }
    const auth = "Bearer " + token;
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




        if (err) { res.render("errorPage",{message:err.message})}
        else{
            res.render("uploadFilesResults",JSON.parse(body))
        }
        fs.unlink(source, (err) => {
            if(err){res.status(500).json({message:"Could not amound the uploaded file"})
        }
    }
        )

            });
}

exports.addUserPage= (req, res, next)=>{
    res.render("add-user",{})
}

exports.uploadSessions= (req, res, next)=>{
    res.render("upload-file",{})
}