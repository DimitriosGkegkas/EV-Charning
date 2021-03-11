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
const reset = require('../src/utils').resetSessions;
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
        this.timeout(5000)

        reset()
        setTimeout(() => {
            sinon.stub(console, "log").callsFake(mockedLog)
            login("admin","petrol4ever")
                setTimeout(() => {

                apikey = consoleOutput[1].split(' ')[2]
                console.log.restore()
                consoleOutput = []
                done()
            },2000)
        }, 1000);


    })

    it('Valid',function (done) {
        this.timeout(2500)
        sessionsPerEV("000000743","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)

        setTimeout(()=>{
            expect(Object.keys(consoleOutput[0])).to.be.deep.equal(["VehicleID","RequestTimestamp","PeriodFrom","PeriodTo", "TotalEnergyConsumed","NumberOfVehicleChargingSessions","NumberOfVisitedPoints", "VehicleChargingSessionList"])
            done()
        },2000)   
    })


    it("No ID",function (done) {
        this.timeout(2500)
        sessionsPerEV(undefined,"2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)

        setTimeout(()=>{
            expect(consoleOutput[0]).to.be.deep.equal("Please Provide a EV Id")
            done()
        },2000)   
    })

    it("No Date From",function (done) {
        this.timeout(2500)
        sessionsPerEV("000000743",undefined,"2019-08-01 22:01:04",apikey)

        setTimeout(()=>{
            expect(consoleOutput[0]).to.be.deep.equal("Please Provide a Date From")
            done()
        },2000)   
    })

    it("No Date To",function (done) {
        this.timeout(2500)
        sessionsPerEV("000000743","2019-08-01 22:01:04",undefined,apikey)

        setTimeout(()=>{
            expect(consoleOutput[0]).to.be.deep.equal("Please Provide a Date To")
            done()
        },2000)   
    })


      
})

  
