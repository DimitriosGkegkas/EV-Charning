var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://localhost:8765";
https = require("https")

describe("Login", function () {

    it("Login Successful", function (done) {
        const jsonObject =
        {
            "username": "admin",
            "password": "petrol4ever"
        }
        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(response).to.have.property("statusCode", 200)
            expect(error).not.to.exist
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Login Failed: Wrong Password", function (done) {
        const jsonObject =
        {
            "username": "admin",
            "password": "someRandomPassword"
        }
        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(response).to.have.property("statusCode", 401)
            expect(body.message).to.equal("Please Check your password")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Login Failed: User doesn't exist", function (done) {
        const jsonObject =
        {
            "username": "userDoesNotExistPjhfjksdhfjshdhdgfhksd",
            "password": "someRandomPassword"
        }
        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(response).to.have.property("statusCode", 401)
            expect(body.message).to.equal("Please Check your username")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Login Failed: no password", function (done) {
        const jsonObject =
        {
            "username": "userDoesNotExistPjhfjksdhfjshdhdgfhksd",
        }
        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(response).to.have.property("statusCode", 400)
            expect(body.message).to.equal("Please Provide a Password")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Login Failed: no username", function (done) {
        const jsonObject =
        {
            "password": "xistPjhfjksdhfjshdhdgfhksd",
        }
        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(response).to.have.property("statusCode", 400)
            expect(body.message).to.equal("Please Provide a Username")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Login Failed: no username or password", function (done) {
        const jsonObject = {}
        request.post({
            url: "https://localhost:8765/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(response).to.have.property("statusCode", 400)
            expect(body.message).to.equal("Please Provide a Username")
            done(); // callback the test runner to indicate the end...
        })
    })
})


describe("Logout", function () {
    it("Not Valid Token", function (done) {

        request.post({
            url: "https://localhost:8765/logout",
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer xksdbkfs '
            },

        }, function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Not Token at all", function (done) {

        request.post({
            url: "https://localhost:8765/logout",
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer'
            },

        }, function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Not Authorization", function (done) {

        request.post({
            url: "https://localhost:8765/logout",
            rejectUnauthorized: false,


        }, function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Header Format Wrong (token with no bearer)", function (done) {

        request.post({
            url: "https://localhost:8765/logout",
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bfasfsafsafsswafr'
            },

        }, function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Header Format Wrong (Extra word)", function (done) {

        request.post({
            url: "https://localhost:8765/logout",
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer someotherWords token'
            },

        }, function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })


    it("Valid Token", function (done) {
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

            const token = body.token
            request.post({
                url: "https://localhost:8765/logout",
                rejectUnauthorized: false,
                headers: {
                    "Authorization": 'Bearer ' + token
                }
            }, function (error, response, body) {
                expect(response).to.have.property("statusCode", 200)

            })




            done(); // callback the test runner to indicate the end...
        })
    })
})
