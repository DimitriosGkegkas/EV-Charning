var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
https = require("https")
const sinon =require('sinon')
const mongoose = require('mongoose');
chai.use(require('chai-json'));
fs = require('fs')
const isAuth = require('../controller/is-auth')

let token 
describe("SessionPerProvider", function () {

    afterEach( function(done){
        isAuth.isAuth.restore()
        done()
    })

    beforeEach( function(done){
        sinon.stub(isAuth,"isAuth").callsFake(({},{},next)=>next())
        done()
    })
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
            request({
                url: "https://localhost:8765/admin/resetsessions"
                , method: 'POST'
                , rejectUnauthorized: false
            }, function (err, resp, body) {


    
                const source = "./test/12Months.csv"
                request({
                    url: "https://localhost:8765/admin/system/sessionsupd"
                    , method: 'POST'
                    , rejectUnauthorized: false
                    , headers: {
                        "Authorization": "Beare "+token
                        , "Content-Type": "multipart/form-data"
                    }
                    , formData: {
                        "file": fs.createReadStream(source)
                    }
                }, function (err, resp, body) {
            
                    done()
            
                });
            })
        })
    } )


    it("Valid Input for 000003424", function (done) {
        this.timeout(5000);

        const point = "000003424"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "2019-10-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerProvider/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            expect(body).to.be.a.jsonObj();
            done(); 
        })
    })
   
    it("DateFrom>DateTo", function (done) {
        this.timeout(5000);

        const point = "000000292"
        const datefrom = "2019-10-01 00:00:00"
        const dateto = "2019-01-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerProvider/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            expect(body).to.be.a.jsonObj();
            done(); 
        })
    })

    it("No Valid From Date", function (done) {
        this.timeout(5000);

        const point = "000000292"
        const datefrom = "g"
        const dateto = "2019-01-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerProvider/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            expect(JSON.parse(body)).to.have.property("message", "Please check API endpoint \n SessionPerProvider/:ProviderID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format")
            
            done(); 
        })
    })
    it("No Valid To Date", function (done) {
        this.timeout(5000);

        const point = "000000292"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "g"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerProvider/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
            }
            ,rejectUnauthorized: false

        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            expect(JSON.parse(body)).to.have.property("message", "Please check API endpoint \n SessionPerProvider/:ProviderID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format")
            
            done(); 
        })
    })

    

    

})


