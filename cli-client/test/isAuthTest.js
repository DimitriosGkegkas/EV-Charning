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

const logout= require('../src/access').logout;
const login = require('../src/access').login;

let apikey 
describe("auth", function () {
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

    var fs = require('fs')






    it('no token file',function (done) {
        this.timeout(5000)
        var oldPath = './../softeng20bAPI.token'
        var newPath = './../temp'
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
            logout(apikey)
            setTimeout(()=>{
                expect(consoleOutput).to.be.deep.equal(["Not Auth"])
                done()
            },1000)
            fs.rename( newPath,oldPath, function (err) {
                done()
            })
          })

          
    });





})