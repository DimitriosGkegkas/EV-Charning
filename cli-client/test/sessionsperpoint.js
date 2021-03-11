const sinon = require('sinon')
https = require("https")
const sinonChai = require("sinon-chai")
const chai = require("chai");
const expect = chai.expect;
chai.use(sinonChai);


const login = require('../src/access').login;

const SessionsPerPoint = require('../src/dataAccess').perPoint;

let apikey 
describe("SessionsPerPoint", function () {
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

    it('wrong point id ',function (done) {
        this.timeout(5000)

        SessionsPerPoint = ("nokaidhjhdbjhfhf","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal([])
            done()
        },1000)
          
    });

    it('Correct SessionsPerPoint',function (done) {
        this.timeout(5000)

        SessionsPerPoint("","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide a Point Id"])
            done()
        },1000)
          
    });
    

    

   

    it('wrong date from  ',function (done) {
       
        this.timeout(5000)

        SessionsPerPoint = ("hbhvhv","5558758ddhbchdcbhgsgdc","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal([])
            done()
        },1000)
          
    })


it('wrong date to ',function (done) {
       
    this.timeout(5000)

    SessionsPerPoint = ("","2019-08-01 20:14:17","hdhdsbhgvdshgvdshgcvshgcvh",apikey)
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal([])
        done()
    },1000)
      
})

it('wrong apikey ',function (done) {
       
    this.timeout(5000)

    SessionsPerPoint = ("","2019-08-01 20:14:17","2019-08-01 22:01:04","bcjehsbjhbfhd")
    setTimeout(()=>{
        expect(consoleOutput).to.be.deep.equal(["please provide valid apikey"])
        done()
    },1000)
      
})
})
