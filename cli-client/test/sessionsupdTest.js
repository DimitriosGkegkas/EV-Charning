const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const sinon = require('sinon')
https = require("https")
const sinonChai = require("sinon-chai")
chai.use(sinonChai);

const sessionsupd = require('../src/admin').sessionsupd
const login = require('../src/access').login;

//file source
let source = "./../back-end/test/12Months.csv"

let apikey 
describe("sessionsupd", function () {
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




    it('sessionsupd: Not Auth',function (done) {
        this.timeout(5000)

        sessionsupd(source,apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Not Authenticated"])
            done()
        },1000)       
    });

    it('sessionsupd: No source',function (done) {
        this.timeout(5000)

        sessionsupd(undefined,apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Check Your File Path"])
            done()
        },1000)     
    });

    it('sessionsupd: Invalid source',function (done) {
        this.timeout(5000)
        let source = "notAValidSource.csv"

        sessionsupd(source,apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Check Your File Path"])
            done()
        },1000)       
    });

    it('sessionsupd: Wrong apikey',function (done) {
        this.timeout(5000)

        sessionsupd(source,"wrongAPIkey")
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please check your API key"])
            done()
        },1000)       
    });

    it('sessionsupd: Successful',function (done) {
        this.timeout(5000)

        sessionsupd(source,apikey)
        setTimeout(()=>{
            expect(consoleOutput[0].split(' ')[0]).to.be.deep.equal("The:")
            expect(consoleOutput[1].split(' ')[0]).to.be.deep.equal("file")
            expect(consoleOutput[1].split(' ')[1]).to.be.deep.equal("had")
            //expect(consoleOutput[1].split(' ')[2]).to.be.deep.equal("key:")
           // expect(consoleOutput[2].split(' ')[2]).to.be.deep.equal(apikey)
            done()
        },1000)       
    });
})