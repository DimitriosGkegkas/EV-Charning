const https = require('https')
const request =require('request')


exports.maxUsage = (req, res, next) => {
    res.render("maxUsage",{})
}