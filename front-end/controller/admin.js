const request = require('request');
const https = require('https');
const fs = require('fs');

exports.Admin = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const access = (req.body.admin==="admin") ? "1": "0"

    const jsonObject =
    {
        "username": username,
        "password": password,
        "email": email,
        "access":access
    }
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/usermod'

        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let apiKey
    try { apiKey = req.cookies.apiKey }
    catch { console.log("Access Denied"); return; }

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
            "Authorization": auth,
            "x-api-key": apiKey
        }
        , json: jsonObject
        , agent: agent
    }, function (err, resp, body) {

        if (resp.statusCode === 429) {
            res.redirect('https://localhost:3000/maxUsage')
            return
        }
        else if (resp.statusCode === 401) {
            res.render("errorPage", { message: body.message })
            return
        }
        if (err) {
            res.render("reportBack", { message: err.message })
        }
        else {
            if (resp.statusCode !== 200) {
                res.render('add-user', { message: body.message })
            }
            else {
                res.render("reportBack", { message: body.message })
            }


        }
    });
}

exports.findUser = (req, res, next) => {
    const username = req.query.username
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/users/' + username

        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let apiKey
    try { apiKey = req.cookies.apiKey }
    catch { console.log("Access Denied"); return; }

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
            "Authorization": auth,
            "x-api-key": apiKey
        }
        , agent: agent
    }, function (err, resp, body) {

        if (err) {
            res.render("errorPage", { message: err.message })
            return
        }
        if (resp.statusCode === 429) {
            res.redirect('https://localhost:3000/maxUsage')
            return
        }
        if (resp.statusCode === 401) {
            res.render("errorPage", { message: JSON.parse(body).message })
            return
        }
        if (resp.statusCode === 400) {
            res.render("findUser", { message: JSON.parse(body).message })
            return
        }
        res.render("findUserResults", { body: JSON.parse(body)})
        return


    })
}


exports.sessionsupd = (req, res, next) => {
    if (!req.file) {
        res.render("upload-file", { message: "Please Select a file" })
        return
    }

    const source = req.file.path;
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/admin/system/sessionsupd'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let apiKey
    try { apiKey = req.cookies.apiKey }
    catch { console.log("Access Denied"); return; }
    let token
    try { token = req.cookies.token }

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
            , "Content-Type": "multipart/form-data",
            "x-api-key": apiKey
        }
        , formData: {
            "file": fs.createReadStream(source)
        }
    }, function (err, resp, body) {
        if (resp) {
            if (resp.statusCode === 429) {
                res.redirect('https://localhost:3000/maxUsage')
            } else if (resp.statusCode === 401) {
                res.render("errorPage", { message: JSON.parse(body).message })
            }
            else if (resp.statusCode === 200) {
                res.render("uploadFilesResults", JSON.parse(body))
            }
        }
        else {
            if (err) {
                res.render("upload-file", { message: err.message })
            }
            else { res.render("upload-file", { message: "Access Denied" }) }
        }
        fs.unlink(source, (err) => {
            if (err) {
            }
        })
    });
}

exports.addUserPage = (req, res, next) => {
    res.render("add-user", { message: "" })
}

exports.findUserPage = (req, res, next) => {
    res.render("findUser", { message: "" })
}

exports.uploadSessions = (req, res, next) => {
    res.render("upload-file", { message: "" })
}