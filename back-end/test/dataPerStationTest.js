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
let apikey
describe("SessionPerStation", function () {


    before(function (done) {
        this.timeout(10000);
        
        request.post({
            url: "https://localhost:8765/admin/resetsessions",
            rejectUnauthorized: false
            
         
        }, function (error, response, body) {
            const jsonObject ={
                "username": "admin",
                "password": "petrol4ever"}
            request({
                url: "https://localhost:8765/login"
                , method: 'POST'
                , rejectUnauthorized: false
                , json: jsonObject
            }, function (err, resp, body) {

                expect(body.token).to.exist
                expect(body.apiKey).to.exist

                token= body.token
                apikey= body.apiKey
    
                const source = "./test/12Months.csv"
                
                request({
                    url: "https://localhost:8765/admin/system/sessionsupd"
                    , method: 'POST'
                    , rejectUnauthorized: false
                    , headers: {
                        "Authorization": "Beare "+token
                        , "Content-Type": "multipart/form-data"
                        , 'x-api-key': apikey
                    }
                    , formData: {
                        "file": fs.createReadStream(source)
                    }
                }, function (err, resp, body) {
                    if(!err){ done()}
                    else throw err
            

            
                });
            })
        })
    })
    it("no api key", function (done) {
        this.timeout(5000);

        const point = "2-39-125-21"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "2019-10-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body)).to.property("message","Please Provide API key")
         
            done(); 
        })
    })
    it("not valid api key", function (done) {
        this.timeout(5000);

        const point = "2-39-125-21"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "2019-10-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                ,"x-api-key":"jshsgajangbxghsz"
                
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body)).to.property("message","Not Allowed")
         
            done(); 
        })
    })
    it("Valid Input for 2-39-125-21", function (done) {
        this.timeout(5000);

        const point = "2-39-125-21"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "2019-10-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            expect(JSON.parse(body)).to.have.property("SessionsSummaryList")
            expect(JSON.parse(body)).to.have.property("PeriodFrom").that.eql(datefrom);
            expect(JSON.parse(body)).to.have.property("PeriodTo").that.eql(dateto );
            expect(JSON.parse(body)).to.have.property("NumberOfChargingSessions").that.eql(2);

            expect(JSON.parse(body)).to.have.property("StationID").that.eql(point );
            expect(body).to.be.a.jsonObj();
            done(); 
        })
    })
    it("Valid Input for 2-39-131-30", function (done) {
        this.timeout(5000);

        const point = "2-39-131-30"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "2019-10-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            expect(JSON.parse(body)).to.have.property("SessionsSummaryList")
            expect(JSON.parse(body)).to.have.property("PeriodFrom").that.eql(datefrom);
            expect(JSON.parse(body)).to.have.property("PeriodTo").that.eql(dateto );
            expect(JSON.parse(body)).to.have.property("NumberOfChargingSessions").that.eql(3);

            expect(JSON.parse(body)).to.have.property("StationID").that.eql(point );
            expect(body).to.be.a.jsonObj();
            done(); 
        })
    })

    it("no date provided 1", function (done) {
        this.timeout(5000);

        const point = "2-39-131-30"
        const datefrom = ""
        const dateto = "2019-10-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 404)
            expect(JSON.parse(body)).to.property("message","Page not found")
            done(); 
        })
    })
    it("no date provided 2", function (done) {
        this.timeout(5000);

        const point = "2-39-131-30"
        const datefrom = ""
        const dateto = ""

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 404)
            expect(JSON.parse(body)).to.property("message","Page not found")
            done(); 
        })
    })

    it("no ID provided ", function (done) {
        this.timeout(5000);

        const point = ""
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "2019-10-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 404)
            expect(JSON.parse(body)).to.property("message","Page not found")
            done(); 
        })
    })

    it("DateFrom>DateTo", function (done) {
        this.timeout(5000);

        const point = "2-39-131-30"
        const datefrom = "2019-10-01 00:00:00"
        const dateto = "2019-01-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            expect(body).to.be.a.jsonObj();
            expect(JSON.parse(body)).to.have.property("SessionsSummaryList").that.eql([]);
            expect(JSON.parse(body)).to.have.property("PeriodFrom").that.eql(datefrom);
            expect(JSON.parse(body)).to.have.property("PeriodTo").that.eql(dateto );
            expect(JSON.parse(body)).to.have.property("NumberOfChargingSessions").that.eql(0);
            expect(JSON.parse(body)).to.have.property("StationID").that.eql(point );
            done(); 
        })
    })

    it("No Valid From Date", function (done) {
        this.timeout(5000);

        const point = "2-39-131-30"
        const datefrom = "g"
        const dateto = "2019-01-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            expect(JSON.parse(body)).to.have.property("message", "Please check API endpoint \n SessionPerStation/:StationID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format")
            
            done(); 
        })
    })

    it("No Valid To Date", function (done) {
        this.timeout(5000);

        const point = "2-39-131-30"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "g"
      const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            expect(JSON.parse(body)).to.have.property("message", "Please check API endpoint \n SessionPerStation/:StationID/:datefrom/:dateto \n with date at YYYY-MM-DD h:mm:ss format")
            
            done(); 
        })
    })

    it("No Station ID found", function (done) {
        this.timeout(5000);

        const point = "CAf1"
        const datefrom = "2019-01-01 00:00:00"
        const dateto = "2019-01-01 00:00:00"

        const auth="Bearer "+token

        request({
            url: "https://localhost:8765/SessionPerStation/"+point+"/"+datefrom+"/"+dateto
            , method: 'GET',
            headers: {
                "Authorization": auth
                , 'x-api-key': apikey
            }
            ,rejectUnauthorized: false
        },  function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            expect(body).to.be.a.jsonObj();
            expect(JSON.parse(body)).to.have.property("SessionsSummaryList").that.eql([]);
            expect(JSON.parse(body)).to.have.property("PeriodFrom").that.eql(datefrom);
            expect(JSON.parse(body)).to.have.property("PeriodTo").that.eql(dateto );
            expect(JSON.parse(body)).to.have.property("NumberOfChargingSessions").that.eql(0);
            expect(JSON.parse(body)).to.have.property("StationID").that.eql(point );
            done(); 
        })
    })

    

})


