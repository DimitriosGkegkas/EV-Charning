const redis = require('redis');
const JWTR = require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);
const secretKey = require('./../database/secretKey');
const adminRights = require('./../Model/adminRights')
const bcrypt = require('bcryptjs');

exports.isAdmin= (req, res, next) => {
    let host = req.headers.origin;
    let api_key = req.header('x-api-key');
    console.log(host)
    console.log(api_key)
};
s