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

    Session.remove({}, () => { })
        .then(() => {
            return bcrypt.hash("petrol4ever", 12)
        }
        )
        .then(hashedPW =>  {
            console.log(hashedPW)
                const user = new User({
                    password: hashedPW,
                    username: "admin"
                })
                user.save()
                    .catch((err) => { 
                        if(err.code===11000){
                            
                            User.findOneAndUpdate({username: "admin"},{password:hashedPW})
                            .then(res.status(200).json({ status: "OK" }))
                            .catch(() => {
                                error = new Error()
                                error.status=400;
                                throw error ;
                                }
                            )
                        }
                    })
                }
        )
        .catch(() => { 
                res.status(400).json({ status: "failed" })
        })
}