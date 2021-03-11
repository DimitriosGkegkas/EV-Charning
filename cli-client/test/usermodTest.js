const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const sinon = require('sinon')
https = require("https")
const sinonChai = require("sinon-chai")
chai.use(sinonChai);

const usermod = require('../src/admin').Admin
const login = require('../src/access').login;

let apikey 
describe("usermod", function () {
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

    it('usermod: Not Auth',function (done) {
        this.timeout(5000)

        usermod("dummyUser","dummyPassw",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Not Authenticated"])
            done()
        },1000)       
    });

    it('usermod: No username',function (done) {
        this.timeout(5000)

        usermod(undefined,"dummyPassw",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please provide username"])
            done()
        },1000)     
    });

    it('usermod: No password',function (done) {
        this.timeout(5000)

        usermod("dummyUser",undefined,apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please provide password"])
            done()
        },1000)       
    });

    it('usermod: Wrong apikey',function (done) {
        this.timeout(5000)

        usermod("dummyUser","dummyPassw","wrongAPIkey")
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Not Allowed"])
            done()
        },1000)       
    });

    it('usermod: No apikey',function (done) {
        this.timeout(5000)

        usermod("dummyUser","dummyPassw",undefined)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide API key"])
            done()
        },1000)       
    });

    it('usermod: Successful',function (done) {
        this.timeout(5000)

        usermod("dummyUser","dummyPassw",apikey)
        
        //let apikeydummy = (consoleOutput[1].split(' ')[2])
        setTimeout(()=>{
            expect(consoleOutput[0].split(' ')[0]).to.be.deep.equal("User")
            expect(consoleOutput[0].split(' ')[1]).to.be.deep.equal("Created/Updated")
            expect(consoleOutput[1].split(' ')[0]).to.be.deep.equal("API")
            expect(consoleOutput[1].split(' ')[1]).to.be.deep.equal("key:")
           // expect(consoleOutput[1].split(' ')[2]).to.be.deep.equal(apikeydummy)
            done()
        },1000)       
    });
})