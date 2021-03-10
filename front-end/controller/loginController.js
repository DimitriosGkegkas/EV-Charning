const https = require('https')
const request =require('request')
exports.login = (req, res, next) => {
    res.render("login",{})
}
exports.basePage = (req, res, next) => {
    res.render("basePage",{})
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
        , headers:{
            "x-api-key":""
        }
        , agent: agent
    }, function (err, resp, body) {
        if(err){
            res.render("login",{message: err.message})
        }
        else{
            console.log(body.message)
            console.log(resp.statusCode)
            if (body.message === "Max API calls exceeded.") {
                res.redirect('maxUsage')
            }
            else if(body.message){
             res.render('login',{message:body.message})
            }
            else{
                res.cookie("token",body.token)
                res.cookie(
                        "apiKey",body.apiKey)
                res.redirect('homepage')
            }


            
        }

    });

}