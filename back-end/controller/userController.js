const express = require('express');
const userSchema = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secretKey = require('../database/secretKey');
const redis = require('redis');
const JWTR =  require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);

exports.signup = (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            userSchema.findOneAndUpdate({ 'username': username }, { 'email': email, 'password': hashedPw }, { new: true }, (err, result) => result)
                .then(result => {
                    if (result === null) {
                        user = new userSchema({
                            'username': username,
                            'email': email,
                            'password': hashedPw
                        });
                        return user.save()
                    }
                    else {
                        return result
                    }
                })

                .then(user => {
                    res.status(200).json(
                        {
                            message: "User Created/Updated",
                            UserId: user._id
                        }
                    )
                }
                )

                .catch(
                    err => {
                        err.statusCode = 400
                        res.status(400).json(
                            {
                                message: "Bad Request: User NOT Created"
                            }
                        )
                        next(err);
                    }
                )
        })
}

exports.getuser = (req, res, next) => {

    const username = req.params.username;
    userSchema.findOne({ 'username': username }, (err, result) => { return result })
        .then(result => {
            res.status(200).json(
                result
            )
        }
        )
}


exports.login= (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let loadUser;
    userSchema.findOne({ 'username': username }, (err, result) => { return result })
    .then(user => {
        if(!user){
            const error = new Error("A user with this username could not be found");
            error.statusCode = 400;
            throw error;
        }
        loadUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then( isEqual =>{
        if(!isEqual){
            const error = new Error("Wrong Password");
            error.statusCode = 401;
            throw error;
        }
        const token = jwtr.sign({
            email: loadUser.email,
            userId: loadUser._id.toString()
        },
        secretKey.key,
        {expiresIn:'1h'}
        )
        res.status(200).json({
            token: token
        })
        
    })
    .catch(err =>
        {
            res.status(401).json({
                message: "Not authorized: Please insert correct password"
            })
            next(err)}
        )
    
}

exports.logout= (req, res, next) => {
    token = req.header("Authentication");
    jwtr.destroy(token)
    res.status(200).json({})

}
