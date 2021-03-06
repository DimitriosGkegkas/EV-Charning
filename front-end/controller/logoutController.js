const https = require('https')
const request =require('request')

exports.logout = (req, res, next) => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/logout'
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
        url: "https://localhost:8765/logout"
        , method: 'POST'
        , headers: {
            "Authorization": auth
        }
        , agent: agent
    }, function (err, resp, body) {
        console.log(body)
        res.cookie('token', {maxAge: 0});
        res.redirect('/login');
    });    

    
}