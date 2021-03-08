var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
https = require("https")
const sinon =require('sinon')
const mongoose = require('mongoose');

const isAuth = require('./../controller/is-auth')

let token ="0"
describe("Session", function () {

    afterEach( function(done){
        isAuth.isAuth.restore()
        done()
    })

    beforeEach( function(done){
        sinon.stub(isAuth,"isAuth").callsFake(({},{},next)=>next())
        done()
    })


    it("Not Logined", function (done) {
        sinon.stub(isAuth,"isAuth").callsFake(({},{},next)=>next())

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

   
})
