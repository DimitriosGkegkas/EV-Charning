const redis = require('redis');
const JWTR = require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);
const secretKey = require('./../database/secretKey');
const bcrypt = require('bcryptjs');
const userSchema = require('../model/user');


const MAX = 50

exports.isAdmin = (req, res, next) => {
    let host = "https://localhost:8765/admin"
    let api_key = req.header('x-api-key');
    if (!api_key) {
        res.status(401).json({ message: "Please Provide API key" })
        return
    }
    userSchema.findOne({ "host": host, apiKey: api_key })
        .then(account => {
            if (account) {
                next()
            }
            else {
                res.status(401).json({ message: "Not Allowed" })
                return
            }
        }
        )

};

exports.hasUsage = (req, res, next) => {
    let api_key = req.header('x-api-key');
    if (!api_key) {
        res.status(401).json({ message: "Please Provide API key" })
        return
    }
    userSchema.findOne({ apiKey: api_key })
        .then(account => {
            if (account) {
                let today = new Date().toISOString().split('T')[0]
                let usageIndex = account.usage.findIndex((day) => day.date.toISOString().split('T')[0] === today);

                if (usageIndex >= 0) {
                    //already used today
                    if (account.usage[usageIndex].count >= MAX) {
                        //stop and respond
                        res.status(429).json({
                            message: 'Max API calls exceeded.',
                        });
                        return
                    }else{
                         
                    account.usage[usageIndex].count = account.usage[usageIndex].count + 1
                    userSchema.findOneAndUpdate({ apiKey: api_key }, { usage: account.usage })
                        .then(() => next())
                        .catch(err => { res.status(401).json({ message: "Not Allowed" }) })
                    }

                    }
                 else {
                    //not today yet
                    account.usage.push({ date: today, count: 1 });
                    userSchema.findOneAndUpdate({ apiKey: api_key }, { usage: account.usage })
                    .then(() => next())
                    .catch(err => { res.status(401).json({ message: "Not Allowed" }) })
                    //ok to use again
                    next();
                }
            }

            
            else {
                res.status(401).json({ message: "Not Allowed" })

                return
            }
        }
        )

};


