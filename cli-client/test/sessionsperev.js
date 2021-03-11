const should = require("should");
const request = require("request");
const chai = require("chai");
const sinon = require('sinon')
https = require("https")
const sinonChai = require("sinon-chai")
chai.use(sinonChai);
const util = require('util');
const findUser = require('../src/admin').findUser
const { loginPost } = require("../../front-end/controller/loginController");
const login = require('../src/access').login;


const sessionsPerEV = require('../src/dataAccess').perEV;
const SessionsPerProvider = require('../src/dataAccess').perProvider;

let apikey 
describe("SessionsPerEV", function () {
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




    it('no EV id ',function (done) {
        this.timeout(5000)

        SessionsPerEV = (undefined,"2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide a EV Id"])
            done()
        },1000)
          
    });
    it('wrong EV id ',function (done) {
        this.timeout(5000)

        SessionsPerStation = ("nokaidhjhdbjhfhf","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide valid EV id"])
            done()
        },1000)
          
    });
    

    it('no date from  ',function (done) {
       
        this.timeout(5000)

        SessionsPerStation = ("",undefined,"2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide a Date From"])
            done()
        },1000)
          
    })

    it('wrong date from  ',function (done) {
       
        this.timeout(5000)

        SessionsPerStation = ("CA-311","5558758ddhbchdcbhgsgdc","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please provid right date from"])
            done()
        },1000)
          
    })

it('no date to ',function (done) {
       
    this.timeout(5000)

    SessionsPerStation = ("CA-311","2019-08-01 20:14:17",undefined,apikey)
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal(["Please Provide a Date To"])
        done()
    },1000)
      
}) 
it('wrong date to ',function (done) {
       
    this.timeout(5000)

    SessionsPerStation = ("CA-311","2019-08-01 20:14:17","hdhdsbhgvdshgvdshgcvshgcvh",apikey)
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal(["Please Provide right Date To"])
        done()
    },1000)
      
})
it('no apikey ',function (done) {
       
    this.timeout(5000)

    SessionsPerStation = ("CA-311","2019-08-01 20:14:17","2019-08-01 22:01:04",undefined)
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal(["Not authenticated"])
        done()
    },1000)
      
}) 
it('wrong apikey ',function (done) {
       
    this.timeout(5000)

    SessionsPerStation = ("CA-311","2019-08-01 20:14:17","2019-08-01 22:01:04","bcjehsbjhbfhd")
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal(["please provide valid apikey"])
        done()
    },1000)
      
})
it('right format ',function (done) {
       
    this.timeout(5000)

    SessionsPerStation = ("CA-311","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
    setTimeout(()=>{
        expect(consoleOutput[0].split(' ')[0]).to.be.deep.equal("token:")
        expect(consoleOutput[1].split(' ')[0]).to.be.deep.equal("API")
        expect(consoleOutput[1].split(' ')[1]).to.be.deep.equal("key:")
        expect(consoleOutput[1].split(' ')[2]).to.be.deep.equal(apikey)
        done()
        
        done()
    },1000)
      
})
    
})