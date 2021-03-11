
var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
const urlBase = "https://localhost:8765/admin";
https = require("https")
const sinon = require('sinon')
const mongoose = require('mongoose');
const fs = require('fs');


//file source
let source = "./test/12Months.csv"


describe("Usermod", function () {
    let apikey
    let token

    before(function (done) {
        this.timeout(5000);
        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }
        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            token = body.token
            apikey = body.apiKey
            done()
        })
    }
    )
    it("no api key", function (done) {
        this.timeout(5000);
        const jsonObject = {
            "password": "DIMIFUN"
        }

        const auth = "Bearer " + token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            , rejectUnauthorized: false
            , headers: { "Authorization": auth }
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 401)
            body.message.should.be.equal("Please Provide API key")
            done(); // callback the test runner to indicate the end...
        })
    })
    it("not valid api key", function (done) {
        this.timeout(5000);
        const jsonObject = {
            "password": "DIMIFUN"
        }

        const auth = "Bearer " + token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            , rejectUnauthorized: false
            , headers: { "Authorization": auth, 'x-api-key': "notaValidAPIkeyjsdkjasdfjbsa" }
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 401)
            body.message.should.be.equal("Not Allowed")
            done(); // callback the test runner to indicate the end...
        })
    })




    it("Not Logined", function (done) {
        this.timeout(5000);
        const jsonObject = {
            "username": "Dimi",
            "password": "DIMIFUN"
        }

        const auth = "Bearer XYZ"

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            , rejectUnauthorized: false
            , headers: { "Authorization": auth, 'x-api-key': apikey }
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
        const jsonObject = {
            "username": "Dimi",
            "password": "DIMIFUN"
        }

        const auth = "Bearer " + token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            , rejectUnauthorized: false
            , headers: { "Authorization": auth, 'x-api-key': apikey }
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 200)
            done(); // callback the test runner to indicate the end...
        })
    })
    it("Logined with no username", function (done) {
        this.timeout(5000);
        const jsonObject = {
            "password": "DIMIFUN"
        }

        const auth = "Bearer " + token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            , rejectUnauthorized: false
            , headers: { "Authorization": auth, 'x-api-key': apikey }
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
        const jsonObject = {
            "username": "DIMIFUN"
        }

        const auth = "Bearer " + token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            , rejectUnauthorized: false
            , headers: { "Authorization": auth, 'x-api-key': apikey }
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
        const jsonObject = {}

        const auth = "Bearer " + token

        request.post({
            url: "https://localhost:8765/admin/usermod"
            , method: 'POST'
            , rejectUnauthorized: false
            , headers: { "Authorization": auth, 'x-api-key': apikey }
            , json: jsonObject

        }, function (error, response, body) {
            expect(error).to.not.exist
            expect(response).to.have.property("statusCode", 400)
            body.message.should.be.equal("Please provide username")
            done(); // callback the test runner to indicate the end...
        })
    })

})


const help = require("./../controller/helpController");

describe("healthcheck", function () {

    afterEach(
        function (done) {
            mongoose.connect.restore()
            done()
        }
    )


    it("No Database Connection", function (done) {
        sinon.stub(mongoose, "connect")


        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data.status;
            }
        };
        help.healthcheck({}, res, () => { })
            .then(result => { result.to.have.property('statusCode', 200); done() })

    }
    )





    it("Database Connection", function (done) {
        sinon.stub(mongoose, "connect")
            .yields()
        request({
            url: "https://localhost:8765/admin/healthcheck"
            , method: 'GET'
            , rejectUnauthorized: false

        }, function (err, resp, body) {
            JSON.parse(body).status.should.equal("OK")
            done()
        });
    });


})









describe("sessionsupd", function () {
    let apikey
    let token
    before(function (done) {
        this.timeout(5000);
        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist
            token = body.token
            apikey = body.apiKey
            done()
        })
    })
    
    it("upload failed: no api key", function (done) {
        const invalidToken = "someWordsInvalidToken"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' + invalidToken
            
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Please Provide API key")
            done(); // callback the test runner to indicate the end...
        })
    })
    
    it("upload failed: invalid api key", function (done) {
        const invalidToken = "someWordsInvalidToken"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' + invalidToken
                , 'x-api-key': "notAValidAPIkeyjnsjbjdasgb"
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not Allowed")
            done(); // callback the test runner to indicate the end...
        })
    })
    
    it("upload failed: Not Auth: Invalid Token", function (done) {
        const invalidToken = "someWordsInvalidToken"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' + invalidToken
                , 'x-api-key': apikey
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })
    it("upload failed: Not Auth: No Token", function (done) {
        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer '
                , 'x-api-key': apikey
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })
    it("upload failed: Not Auth: Extra Word", function (done) {

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer potato ' + token
                , 'x-api-key': apikey
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("upload failed: Not Auth: No Bearer", function (done) {

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": token
                , 'x-api-key': apikey
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("upload failed: Not Auth: No authorization field", function (done) {

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Content-Type": "multipart/form-data"
                , 'x-api-key': apikey
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("upload Successful", function (done) {

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' + token
                , 'x-api-key': apikey
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 200)
            expect(error).not.to.exist
            done(); // callback the test runner to indicate the end...
        })
    })

    it("upload Failed: no file", function (done) {

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' + token
                , 'x-api-key': apikey
                , "Content-Type": "multipart/form-data"
            },
            formData: {

            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 400)
            expect(JSON.parse(body).message).to.equal("Please Check your File Path")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("upload Failed: wrong file", function (done) {
        source = "./test/Starry_Night_Over_the_Rhone.jpg"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' + token
                , 'x-api-key': apikey
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            expect(response).to.have.property("statusCode", 500)
            done(); // callback the test runner to indicate the end...
        })
    })
})
