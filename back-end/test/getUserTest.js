var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://localhost:8765";
https = require("https")

describe("getuser", function () {
    it("Not Valid Token", function (done) {
        const username="admin" 


        request.get({
            url: "https://localhost:8765/admin/users/" + username,
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer xksdbkfs '
            }
            

        }, function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })

    it("Not Token at all", function (done) {
        const username="admin"
        request.get({
            url:"https://localhost:8765/admin/users/" + username ,
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
        const username="admin"
        request.get({
            url:"https://localhost:8765/admin/users/" + username ,
            rejectUnauthorized: false,


        }, function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Not authenticated")
            done(); // callback the test runner to indicate the end...
        })
    })
    it("Header Format Wrong (token with no bearer)", function (done) {
        const username="admin"
        request.get({
            url:"https://localhost:8765/admin/users/" + username,
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
        const username="admin"
        request.get({
            url: "https://localhost:8765/admin/users/" + username,
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
    it("Invalid Username",function(done)
    {   
        const jsonObject ={
            "username": "admin",
            "password": "petrol4ever"}
    
            request.post({
                url: "https://localhost:8765/login",
                rejectUnauthorized: false
                , json: jsonObject
                
            }, function (error, response, body) {
                expect(body.token).to.exist
                const token= body.token
        
    
        const username="UserDOESnotExIsT64646854"
        request.get({
            url:"https://localhost:8765/admin/users/" + username,
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' +token
        }
    
        ,function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Please insert a correct username")
             // callback the test runner to indicate the end...
        }
    })
         done();
})

})
    it("No username provided",function(done)
    {  
        const jsonObject ={
            "username": "admin",
            "password": "petrol4ever"}
    
            request.post({
                url: "https://localhost:8765/login",
                rejectUnauthorized: false
                , json: jsonObject
                
            }, function (error, response, body) {
                expect(body.token).to.exist
                const token= body.token
        
    
        const username=" "
        request.get({
            url:"https://localhost:8765/admin/users/" + username,
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' +token
        }
    
        ,function (error, response, body) {

            expect(response).to.have.property("statusCode", 401)
            expect(JSON.parse(body).message).to.equal("Please insert  username")
             // callback the test runner to indicate the end...
        }
    })
         done();
})
    })

    it("Valid Token,Valid Username", function (done) {
        const jsonObject ={
            "username": "admin",
            "password": "petrol4ever"}
    
            request.post({
                url: "https://localhost:8765/login",
                rejectUnauthorized: false
                , json: jsonObject
                
            }, function (error, response, body) {
                expect(body.token).to.exist
                const token= body.token
        
    
        const username="admin"
        request.get({
            url:"https://localhost:8765/admin/users/" + username,
            rejectUnauthorized: false,
            headers: {
                "Authorization": 'Bearer ' +token
        }
    
        ,function (error, response, body) {

          

            expect(response).to.have.property("statusCode", 200)
        }
    })
         done();
})
    })
    })