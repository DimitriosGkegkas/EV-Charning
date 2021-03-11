
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
describe("login", function () {
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




    it('No Auth User ',function (done) {
        this.timeout(5000)
        login("dxkjgdkjzxfgijk","sfhikasj")
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Check your username"])
            done()
        },1000)
          
    });

    it('admin with wrong password ',function (done) {

        this.timeout(5000)

        login("admin","sfhikasj")
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Check your password"])
            done()
        },1000)
          
    });

    it('admin with no password ',function (done) {

        this.timeout(5000)

        login("admin",undefined)
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide a Password"])
            done()
        },1000)
          
    });

    it('admin with no username',function (done) {

        this.timeout(5000)

        login(undefined,"admin")
        setTimeout(()=>{
            expect(consoleOutput).to.be.deep.equal(["Please Provide a Username"])
            done()
        },1000)
          
    });

    
    it('Correct Login',function (done) {

        this.timeout(5000)

        login("admin","petrol4ever")
        setTimeout(()=>{
            expect(consoleOutput[0].split(' ')[0]).to.be.deep.equal("token:")
            expect(consoleOutput[1].split(' ')[0]).to.be.deep.equal("API")
            expect(consoleOutput[1].split(' ')[1]).to.be.deep.equal("key:")
            expect(consoleOutput[1].split(' ')[2]).to.be.deep.equal(apikey)
            done()
        },1000)
          
    });


})