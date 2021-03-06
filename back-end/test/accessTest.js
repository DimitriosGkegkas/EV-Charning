const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const urlBase = "https://localhost:8765";
https = require("https")


describe("Login", function () {

    it("Login Successful", function (done) {
        const jsonObject =
        {
            "username": "admin",
            "password": "petrol4ever"
        }
        request.post({
            url: urlBase + "/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist
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
            url: urlBase + "/login",
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
            url: urlBase + "/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(body.apiKey).not.to.exist
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
            url: urlBase + "/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(body.apiKey).not.to.exist
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
            url: urlBase + "/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(body.apiKey).not.to.exist
            expect(response).to.have.property("statusCode", 400)
            expect(body.message).to.equal("Please Provide a Username")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Login Failed: no username or password", function (done) {
        const jsonObject = {}
        request.post({
            url: urlBase + "/login",
            rejectUnauthorized: false,
            json: jsonObject,

        }, function (error, response, body) {
            expect(body.token).not.to.exist
            expect(body.apiKey).not.to.exist
            expect(response).to.have.property("statusCode", 400)
            expect(body.message).to.equal("Please Provide a Username")
            done(); // callback the test runner to indicate the end...
        })
    })
})

describe("Logout", function () {

    it("No API key", function (done) {
        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: urlBase +"/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            const token = body.token
            const apikey = body.apiKey

            request.post({
                url: urlBase +"/logout",
                rejectUnauthorized: false,
                headers: {
                    "Authorization": 'Bearer ' +token,
                }}
                ,function (error, response, body) {
                    expect(response).to.have.property("statusCode", 401)
                    expect(JSON.parse(body).message).to.equal("Please Provide API key")
                    done(); // callback the test runner to indicate the end...

                })

            
        })
    })

    it("Not Valid API key", function (done) {
        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: urlBase +"/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            const token = body.token
            const apikey = body.apiKey

            request.post({
                url: urlBase +"/logout",
                rejectUnauthorized: false,
                headers: {
                    "Authorization": 'Bearer ' +token,
                    'x-api-key': "notAValidAPIkeyjskjfhak"
                }}
                ,function (error, response, body) {
                    expect(response).to.have.property("statusCode", 401)
                    expect(JSON.parse(body).message).to.equal("Not Allowed")
                    done(); // callback the test runner to indicate the end...
                })

           
        })
    })
    
    it("Not Valid Token", function (done) {

        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: urlBase +"/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            //const token = body.token
            const apikey = body.apiKey

            request.post({
                url: urlBase +"/logout",
                rejectUnauthorized: false,
                headers: {
                    "Authorization": 'Bearer ' +"NotValidtoken",
                    'x-api-key': apikey
                }}
                ,function (error, response, body) {
                    expect(response).to.have.property("statusCode", 401)
                    expect(JSON.parse(body).message).to.equal("Not authenticated")
                    done(); // callback the test runner to indicate the end...
                })
        })
    })

    it("No Token at all", function (done) {
        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: urlBase +"/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            const token = body.token
            const apikey = body.apiKey

            request.post({
                url: urlBase +"/logout",
                rejectUnauthorized: false,
                headers: {
                    "Authorization": 'Bearer ',
                    'x-api-key': apikey
                }}
                ,function (error, response, body) {
                    expect(response).to.have.property("statusCode", 401)
                    expect(JSON.parse(body).message).to.equal("Not authenticated")
                    done(); // callback the test runner to indicate the end...
                })

        })
    })

    it("Not Authorization", function (done) {
        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: urlBase +"/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            const token = body.token
            const apikey = body.apiKey

            request.post({
                url: urlBase +"/logout",
                rejectUnauthorized: false,
                headers: {
                    'x-api-key': apikey
                }}
                ,function (error, response, body) {
                    expect(response).to.have.property("statusCode", 401)
                    expect(JSON.parse(body).message).to.equal("Not authenticated")
                    done(); // callback the test runner to indicate the end...
                })

        })
    })

    

    it("Header Format Wrong (token with no bearer)", function (done) {

        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: urlBase +"/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            const token = body.token
            const apikey = body.apiKey

            request.post({
                url: urlBase +"/logout",
                rejectUnauthorized: false,
                headers: {
                    "Authorization": token,
                    'x-api-key': apikey
                }}
                ,function (error, response, body) {
                    expect(response).to.have.property("statusCode", 401)
                    expect(JSON.parse(body).message).to.equal("Not authenticated")
                    done(); // callback the test runner to indicate the end...
                })

        })
    })

    it("Header Format Wrong (Extra word)", function (done) {
        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: urlBase +"/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            const token = body.token
            const apikey = body.apiKey

            request.post({
                url: urlBase +"/logout",
                rejectUnauthorized: false,
                headers: {
                    "Authorization": 'Bearer hi asjdhkahs' + token,
                    'x-api-key': apikey
                }}
                ,function (error, response, body) {
                    expect(response).to.have.property("statusCode", 401)
                    expect(JSON.parse(body).message).to.equal("Not authenticated")
                    done(); // callback the test runner to indicate the end...
                })

        })
    })


    it("Valid Logout", function (done) {
        const jsonObject = {
            "username": "admin",
            "password": "petrol4ever"
        }

        request.post({
            url: urlBase +"/login",
            rejectUnauthorized: false
            , json: jsonObject

        }, function (error, response, body) {
            expect(body.token).to.exist
            expect(body.apiKey).to.exist

            const token = body.token
            const apikey = body.apiKey

            request.post({
                url: urlBase +"/logout",
                rejectUnauthorized: false,
                headers: {
                    "Authorization": 'Bearer ' +token,
                    'x-api-key': apikey
                }}
                ,function (error, response, body) {
                    expect(response).to.have.property("statusCode", 200)
                    done(); // callback the test runner to indicate the end...
                })

        })
    })
})