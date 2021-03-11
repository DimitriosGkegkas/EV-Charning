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


const sessionsPerEV = require('../src/dataAccess').perEV;


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
            expect(consoleOutput).to.be.deep.equal([])
            done()
        },1000)
          
    });
    it('wrong EV id ',function (done) {
        this.timeout(5000)

        SessionsPerEV = ("nokaidhjhdbjhfhf","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal([])
            done()
        },1000)
          
    });
    

    it('no date from  ',function (done) {
       
        this.timeout(5000)

        SessionsPerEV = ("",undefined,"2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal([" bgf"])
            done()
        },1000)
          
    })

    it('wrong date from  ',function (done) {
       
        this.timeout(5000)

        SessionsPerEV = ("","5558758ddhbchdcbhgsgdc","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal([])
            done()
        },1000)
          
    })

it('no date to ',function (done) {
       
    this.timeout(5000)

    SessionsPerEV = ("","2019-08-01 20:14:17",undefined,apikey)
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal([])
        done()
    },1000)
      
}) 
it('wrong date to ',function (done) {
       
    this.timeout(5000)

    SessionsPerEV = ("","2019-08-01 20:14:17","hdhdsbhgvdshgvdshgcvshgcvh",apikey)
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal([])
        done()
    },1000)
      
})

it('wrong apikey ',function (done) {
       
    this.timeout(5000)

    SessionsPerEV = ("","2019-08-01 20:14:17","2019-08-01 22:01:04","bcjehsbjhbfhd",apikey)
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal([])
        done() 
    },1000)
      
})
it('right format ',function (done) {
       
    this.timeout(5000)

    SessionsPerEV = ("","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal([])
        
        done()
        
        
    },1000)
      
})
    
})