const https = require('https')
const request =require('request')

exports.logout = (req, res, next) => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/logout'
        , rejectUnauthorized: false
    };
    let apiKey
    try {apiKey = req.cookies.apiKey}
    catch {console.log("Access Denied");return;}

    const agent = new https.Agent(agentOptions);
    
    let token
    try {token = req.cookies.token}
    catch {console.log("Access Denied");return}
    const auth = "Bearer " + token;
    
    request({
        url: "https://localhost:8765/logout"
        , method: 'POST'
        , headers: {
            "Authorization": auth,
            "x-api-key":apiKey
        }
        , agent: agent
    }, function (err, resp, body) {
        res.cookie('token', {maxAge: 0});
        res.redirect('/login');
    });    

}