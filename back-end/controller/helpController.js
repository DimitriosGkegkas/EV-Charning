const mongoose = require('mongoose');
const databaseURL = require('./../database/auth');
const Session = require('./../model/session');
const User = require('./../model/user');
const bcrypt = require('bcryptjs');

exports.healthcheck = (req, res, next) => {
    mongoose.connect(databaseURL.URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { res.status(200).json({ status: "OK" }) })
        .catch(() => { res.status(200).json({ status: "failed" }) })
}

exports.initAdmin = (req, res, next) => {
    bcrypt.hash("petrol4ever", 12)
        .then(hashedPW => {
            const user = new User({
                password: hashedPW,
                username: "admin"
            })
            user.save()
                .then(() => {
                    Session.collection.countDocuments({})
                        .then(SesCount => {
                            if (SesCount === 0) {
                                res.status(200).json({
                                    status: "OK"
                                })
                            }
                            else {
                                res.status(402).json({
                                    status: "failed"
                                })
                            }
                            return
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json({
                                status: "failed"
                            })
                            return
                        })
                })
                .catch((err) => {
                    if (err.code === 11000) {       // if there is a user admin in Db
                        User.findOneAndUpdate({ username: "admin" }, { password: hashedPW })
                            .then(() => {
                                Session.collection.countDocuments({})
                                    .then(SesCount => {
                                        if (SesCount === 0) {
                                            res.status(200).json({
                                                status: "OK"
                                            })
                                        }
                                        else {
                                            res.status(402).json({
                                                status: "failed"
                                            })
                                        }
                                        return
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        res.status(400).json({
                                            status: "failed"
                                        })
                                        return
                                    })
                            })
                            .catch(() => {
                                res.status(400).json({
                                    status: "failed"
                                    //message: "admin is not correctly initialized"
                                })
                                return
                            })
                    }
                    else {
                        res.status(400).json({
                            status: "failed"
                        })
                        return
                    }
                })
        })
        .catch(err => {
            console.log(err)
            res.status(402).json({
                status: "failed"
            })
            return
        })
}

exports.resetsessions = (req, res, next) => {
    Session.collection.countDocuments({})
        .then(SesCount => {
            if (SesCount === 0) {
                this.initAdmin(req, res, next)
                return
            }
            else {
                Session.collection.drop()
                    .then(() => {
                        this.initAdmin(req, res, next)
                        return
                    })
                    .catch(() => {
                        res.status(402).json({
                            status: "failed"
                        })
                        return
                    })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(402).json({
                status: "failed"
            })
            return
        })
}