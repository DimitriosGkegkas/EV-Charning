var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
https = require("https")
const sinon =require('sinon')
const mongoose = require('mongoose');

const isAuth = require('./../controller/is-auth')

let token ="0"
describe("SessionPerPoint", function () {

    afterEach( function(done){
        isAuth.isAuth.restore()
        done()
    })

    beforeEach( function(done){
        sinon.stub(isAuth,"isAuth").callsFake(({},{},next)=>next())
        done()
    })


    it("Valid Input", function (done) {
        this.timeout(5000);

        const point = "CA-311"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "2019-10-01 00:00:00"

        const auth="Bearer XYZ"

        request({
            url: "https://localhost:8765/SessionPerPoint/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET'
            , agent: agent
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            expect(body).to.be.empty
            done(); // callback the test runner to indicate the end...
        })
    })

})
