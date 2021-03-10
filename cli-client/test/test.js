const should = require("should");
const request = require("request");
const chai = require("chai");
const expect = chai.expect;
const sinon = require('sinon')
https = require("https")
const sinonChai = require("sinon-chai")
chai.use(sinonChai);
const util = require('util');

const findUser = require('./../src/admin').findUser
const login = require('./../src/access').login
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
        login("admin","petrol4ever")
        done()

    })




    it('Not admin access user', async function (done) {
        const req = { userId: '5c0f66b979af55031b34728a' };
        this.timeout(5000)

        findUser("admin","adminxrsmjiehqb-vd2w8ordxh-tmfacyt364")
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["pipa"])
            done()
        },1000)
          

    

    });




})