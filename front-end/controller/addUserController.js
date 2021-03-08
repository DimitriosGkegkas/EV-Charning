const https = require('https')
const request =require('request')

exports.login = (req, res, next) => {
    res.render("login",{})
}

exports.loginPost = (req, res, next) => {
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
        , path: '/login'

        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/login"
        , method: 'POST'
        , json: jsonObject
        , agent: agent
    }, function (err, resp, body) {
        if(err){
            res.render("login",{message: err.message})
        }
        else{
            res.cookie("token",body.token, { maxAge: 60*60})
            res.redirect('homepage')

            
        }

    });

}