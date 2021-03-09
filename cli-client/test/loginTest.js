var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://localhost:8765";
https = require("https")
var sinon=require('sinon');
const { access } = require("fs");
const login=require("./../src/access").login
var chai = require('chai');
var sinon = require('sinon');
chai.use(require('sinon-chai'));


describe("Login", function () {
    beforeEach(()=>{sinon.spy(console,"log")})
    afterEach(()=>{console.log.restore()})
    it("Login Successful", function (done) {
        const username="admin"
        const password="petrol4ever"
        const p=new Promise(()=>)
        login.bind(this,username,password)
        .then(()=>{
            expect( console.log ).to.be.called
            
            expect( console.log.calledOnce ).to.be.true
            expect( console.log.calledWith("Token Saved in File") ).to.be.true
            expect(file('softeng20bAPI.token.js')).to.exist
            expect(file('softeng20bAPI.token.js')).to.contain(body.token);

            done(); // callback the test runner to indicate the end...

        })
        
            
           
           
        
    })
})