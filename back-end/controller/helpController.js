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

exports.resetsessions = (req, res, next) => {
    Session.collection.drop()
        .then(() => {
            return bcrypt.hash("petrol4ever", 12)
        })
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
                                    // message: "No data"
                                })
                            }
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
                                                // message: "No data"
                                            })
                                        }
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
                })
        })
        .catch(err => {
            console.log(err)
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
                            // message: "No data"
                        })
                    }
                    return
                })
                .catch(() => {
                    res.status(402).json({
                        status: "failed"
                        // message: "No data"
                    })
                })

        })
}