const sinon = require('sinon')
https = require("https")
const sinonChai = require("sinon-chai")
chai.use(sinonChai);
const util = require('util');
const findUser = require('../src/admin').findUser
const { loginPost } = require("../../front-end/controller/loginController");
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



    it('Correct SessionsPerPoint',function (done) {
        this.timeout(5000)

        SessionsPerPoint("CA-311","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey")
        setTimeout(()=>{
            expect(consoleOutput[0].split(' ')[0]).to.be.deep.equal("token:")
            expect(consoleOutput[1].split(' ')[0]).to.be.deep.equal("API")
            expect(consoleOutput[1].split(' ')[1]).to.be.deep.equal("key:")
            expect(consoleOutput[1].split(' ')[2]).to.be.deep.equal(apikey)
            done()
        },1000)
          
    });
    it('no point id ',function (done) {
        this.timeout(5000)

        SessionsPerPoint = (undefined,"2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide a point Id"])
            done()
        },1000)
          
    });
    it('wrong point id ',function (done) {
        this.timeout(5000)

        SessionsPerPoint = ("nokaidhjhdbjhfhf","2019-08-01 20:14:17","2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide valid point id"])
            done()
        },1000)
          
    });
    

    it('no date from  ',function (done) {
       
        this.timeout(5000)

        SessionsPerStation = ("CA-311",undefined,"2019-08-01 22:01:04",apikey)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide a Date From"])
            done()
        },1000)
          
    })
