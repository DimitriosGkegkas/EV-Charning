var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
https = require("https")
const sinon =require('sinon')
const mongoose = require('mongoose');


let token
describe("Usermod", function () {

    before(function (done) {
        this.timeout(5000);
        const jsonObject ={
        "username": "admin",
        "password": "petrol4ever"}

        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false
            , json: jsonObject
            
        }, function (error, response, body) {
            expect(body.token).to.exist

            token= body.token
            done()
        })
        }
            )
            


    it("Not Logined", function (done) {
        this.timeout(5000);
        const jsonObject ={
            "username": "Dimi",
            "password": "DIMIFUN"}

        const auth="Bearer XYZ"

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            ,rejectUnauthorized: false
            , headers: { "Authorization": auth}
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 401)
            expect(body.message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Logined with exist username/password", function (done) {
        this.timeout(5000);
        const jsonObject ={
            "username": "Dimi",
            "password": "DIMIFUN"}

        const auth="Bearer "+token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            ,rejectUnauthorized: false
            , headers: { "Authorization": auth}
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            done(); // callback the test runner to indicate the end...
        })
    })


    it("Logined with no username", function (done) {
        this.timeout(5000);
        const jsonObject ={
            "password": "DIMIFUN"}

        const auth="Bearer "+token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            ,rejectUnauthorized: false
            , headers: { "Authorization": auth}
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            body.message.should.be.equal("Please provide username")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Logined with no password", function (done) {
        this.timeout(5000);
        const jsonObject ={
            "username": "DIMIFUN"}

        const auth="Bearer "+token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            ,rejectUnauthorized: false
            , headers: { "Authorization": auth}
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            body.message.should.be.equal("Please provide password")
            done(); // callback the test runner to indicate the end...
        })
    })
    it("Logined with no params", function (done) {
        this.timeout(5000);
        const jsonObject ={}

        const auth="Bearer "+token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            ,rejectUnauthorized: false
            , headers: { "Authorization": auth}
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            body.message.should.be.equal("Please provide username")
            done(); // callback the test runner to indicate the end...
        })
    })
    it("Logined with no jsonObje", function (done) {
        this.timeout(5000);


        const auth="Bearer "+token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            ,rejectUnauthorized: false
            , headers: { "Authorization": auth}


        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            body.message.should.be.equal("Please provide username")
            done(); // callback the test runner to indicate the end...
        })
    })
})


describe("healthcheck", function () {

    afterEach(
        function (done) {
        mongoose.connect.restore()
        done()
        }
    )
    

    it("No Database Connection",  function (done) {
        sinon.stub(mongoose,"connect")
        .callsFake(()=>{throw new Error("not connected")})
        request({
            url: "https://localhost:8765/admin/healthcheck"
            , method: 'GET'
            ,rejectUnauthorized: false

        }, function (err, resp, body) {
           JSON.parse(body).status.should.equal("Failed")
            done()
        });
    });


    it("Database Connection",  function (done) {
        sinon.stub(mongoose,"connect")
        .yields()
        request({
            url: "https://localhost:8765/admin/healthcheck"
            , method: 'GET'
            ,rejectUnauthorized: false

        }, function (err, resp, body) {
           JSON.parse(body).status.should.equal("OK")
            done()
        });
    });
       

    })

    






