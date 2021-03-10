const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const sinon = require('sinon')
https = require("https")
const sinonChai = require("sinon-chai")
chai.use(sinonChai);
const util = require('util');
const findUser = require('../src/admin').findUser
const { loginPost } = require("../../front-end/controller/loginController");

const login = require('../src/access').login;


let apikey 
describe("findUser", function () {
    this.timeout(10000)
    const originalLog = console.log
    let consoleOutput = []
    const mockedLog = output => consoleOutput.push(output)


    afterEach((done) => {
        console.log.restore()
        consoleOutput = []
        done()
    })
    beforeEach((done) => {
        sinon.stub(console, "log").callsFake(mockedLog)
        done()
    })
    before((done) => {
        sinon.stub(console, "log").callsFake(mockedLog)
        login("admin","petrol4ever")
        setTimeout(()=>{
            apikey = consoleOutput[1].split(' ')[2]
            console.log.restore()
            consoleOutput = []
            done() },1000)

    })




    it('findUser: Not Auth',function (done) {
        this.timeout(5000)

        findUser("admin",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Not Authenticated"])
            done()
        },1000)       
    });
    
    it('findUser: No apikey',function (done) {
        this.timeout(5000)

        findUser("admin",undefined)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please provide an API key"])
            done()
        },1000)   
    });

    it('findUser: No username',function (done) {
        this.timeout(5000)

        findUser(undefined,apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please provide a username"])
            done()
        },1000)     
    });

    it('findUser: Wrong username',function (done) {
        this.timeout(5000)

        findUser("userDoesNotExistjdhsjsjdskf",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please insert a correct username"])
            done()
        },1000)       
    });

    it('findUser: Wrong apikey',function (done) {
        this.timeout(5000)

        findUser("admin","wrongAPIkey")
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please check your API key"])
            done()
        },1000)       
    });

    it('findUser: Successful',function (done) {
        this.timeout(5000)

        findUser("admin",apikey)
        setTimeout(()=>{
            expect(consoleOutput[0].split(' ')[0]).to.be.deep.equal("username:")
            expect(consoleOutput[1].split(' ')[0]).to.be.deep.equal("admin")
            expect(consoleOutput[1].split(' ')[1]).to.be.deep.equal("API")
            expect(consoleOutput[1].split(' ')[2]).to.be.deep.equal("key:")
            expect(consoleOutput[2].split(' ')[2]).to.be.deep.equal(apikey)
            done()
        },1000)       
    });
})