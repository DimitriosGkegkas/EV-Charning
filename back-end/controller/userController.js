const express = require('express');
const userSchema = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secretKey = require('../database/secretKey');
const redis = require('redis');
const JWTR = require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);



exports.signup = (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if(!username){
        res.status(400).json(
            { message: "Please provide username"}
         )
         return
    }
    if(!password){
        res.status(400).json(
            { message: "Please provide password"}
         )
         return
    }
    bcrypt.hash(password, 12)
        .then(hashedPw => {
            userSchema.findOneAndUpdate({ 'username': username }, { 'email': email, 'password': hashedPw }, { new: true }, (err, result) => result)
                .then(result => {
                    if (result === null) {
                        try{
                        user = new userSchema({
                            'username': username,
                            'email': email,
                            'password': hashedPw
                        });
                        return user.save()
                         }
                        catch{
                            res.status(500).json({ message: "Could Not Save User to Database"})
                         }
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
                         throw err
                    }
                )
        })

        .catch(err =>{
            res.status(err.status).json({message:err.message})

        }
        )
}

exports.getuser = (req, res, next) => {
    const username = req.params.username; 
    userSchema.findOne({ 'username': username }, (err, result) => {   
        return result
    })
        .then(result => {
            if (result===null) {
                res.status(400).json({
                    message: "Please insert a correct username"
                })
            }
            else {
            res.status(200).json(
                result
            )
            }
        })
        .catch(err => {
            res.status(err.statusCode).json({
                message: err.message
            })
            return
        })
}


exports.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username ){
        res.status(400).json({
            message: "Please Provide a Username"
        })
        return
    }
    if(!password ){
        res.status(400).json({
            message: "Please Provide a Password"
        })
        return
    }
    let loadUser;
    userSchema.findOne({ 'username': username }, (err, result) => { 
        if(err){
            throw err
        }
        return result })
    .then(user => {
        if(!user){
            const err =new Error("Please Check your username")
            err.statusCode=401
            throw err
        }
        loadUser = user;
        return bcrypt.compare(password, user.password).catch(err => {
            throw err
        })
    })
    .then( isEqual =>{
        if(!isEqual){
            const err =new Error("Please Check your password")
            err.statusCode=401
            throw err
        }
        jwtr.sign({
            userId: loadUser._id.toString()
        },
        secretKey.key,
        {expiresIn:'1h'}
        ).then(token=>res.status(200).json({
            token: token
        })).catch(err => {throw err})

    })
    .catch(err =>
        {
            res.status(err.statusCode).json({
                message: err.message
            })
            return
            }
        )

}

exports.logout = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    jwtr.destroy(token).then(res.status(200).json({}))
}