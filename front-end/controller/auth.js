const https = require('https')
const request =require('request')

exports.check = (req, res, next) => {
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/auth' 
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
        url: "https://localhost:8765/auth" 
        , method: 'GET'
        , headers: {
            "Authorization": auth
        }
        , agent: agent
    }, function (err, resp, body) {

            if(resp.statusCode===200){
                next()
            }
            else(
                res.redirect("basePage")
            )

    }
    )
}
