const https = require('https')
const request =require('request')


exports.home = (req, res, next) => {
    res.render("homepage",{})
}