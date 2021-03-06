const redis = require('redis');
const JWTR = require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);
const secretKey = require('./../database/secretKey');

module.exports = (req, res, next) => {
    let token;
    try {
        token = req.header('Authorization').split(' ')[1];
    } catch (err) {
        res.status(401).json({message: "Not authenticated"})
    }
    let decodedToken;
    try {
        jwtr.verify(token, secretKey.key)
            .then(decodedToken => {next()})
            .catch( () => { res.status(401).json({message: "Not authenticated"})} )
    }
    catch (err) {
        res.status(401).json({message: "Not authenticated"})
    }

    
};

