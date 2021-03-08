var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://localhost:8765";
https = require("https")
const mongoose = require('mongoose');
const databaseURL = require('./../database/auth');
const Session = require('./../model/session');

describe("resetSessions", function () {
    // the it function do the test, in this case, the endpoint /cards, that should return 100 cards max
    it("there is admin and there are no sessions", function (done) {
        const jsonObject ={
            "username": "admin",
            "password": "petrol4ever"}
    
            request.post({
                url: "https://localhost:8765/login",
                rejectUnauthorized: false
                , json: jsonObject
                
            }, function (error, response, body) {
            
            Session.collection.countDocuments({})
            .then( SesCount=> {
                expect(SesCount).to.equal("0")

            }
                )   
                .catch(err => {
                    expect(response).to.have.property("statusCode", 401)
                    expect(JSON.parse(body).message).to.equal("Not authenticated")
                    ;
        
                }) 
        request.post({
            url: "https://localhost:8765/admin/resetsessions",
            rejectUnauthorized: false,
            json:jsonObject

        }, function (error, response, body) {
    
            expect(response).to.have.property("statusCode", 200)
             // callback the test runner to indicate the end...
        })
       
    })
    done();
})
})