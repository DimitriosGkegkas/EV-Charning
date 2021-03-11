
const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const sinon = require('sinon')
https = require("https")
const sinonChai = require("sinon-chai")

chai.use(sinonChai);
const util = require('util');


const login = require('../src/access').login;


const logout = require('../src/access').logout;

let apikey 
describe("logout", function () {
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




    it('No api key ',function (done) {
        this.timeout(5000)
        logout(undefined)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Not authenticated"])
            done()
        },1000)
          
    });

    
    it('Wrong API KEY ',function (done) {
        this.timeout(5000)
        logout("dflkjsdjkundefined")
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Not authenticated"])
            done()
        },1000)
          
    });


    it('Successful logout',function (done) {
        this.timeout(5000)
        logout(apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["You logged out successfully"])
            done()
        },1000)
          
    });



})