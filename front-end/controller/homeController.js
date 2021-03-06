const https = require('https')
const request =require('request')


exports.home = (req, res, next) => {
    console.log(req.cookie)
    console.log(req.cookie["token"])
    res.render("homepage",{})
}