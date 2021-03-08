const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://localhost:8765/admin";
https = require("https")
const fs = require('fs');

let token
describe("sessionsupd", function () {

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
            token = body.token
            done()
        })
    })

    it("upload failed: Not Auth: Invalid Token", function (done) {
        const source = "./../cli-client/database/12Months.csv"
        invalidToken = "someWordsInvalidToken"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer '+ invalidToken
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
        const source = "./../cli-client/database/12Months.csv"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer '
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
        const source = "./../cli-client/database/12Months.csv"  

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer potato ' + token
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
        const source = "./../cli-client/database/12Months.csv"  

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": token
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
        const source = "./../cli-client/database/12Months.csv"  

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                 "Content-Type": "multipart/form-data"
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
        const source = "./../cli-client/database/12Months.csv"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer '+ token
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
        const source = "./../cli-client/database/12Months.csv"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' + token
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
        const source = "./../cli-client/database/Starry_Night_Over_the_Rhone.jpg"

        request.post({
            url: urlBase + '/system/sessionsupd',
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' + token
                , "Content-Type": "multipart/form-data"
            },
            formData: {
                "file": fs.createReadStream(source)
            }

        }, function (error, response, body) {
            //expect(error).to.exist
            expect(response).to.have.property("statusCode", 400)
            expect(JSON.parse(body).message).to.equal("Please upload only csv file.")
            done(); // callback the test runner to indicate the end...
        })
    })
})

