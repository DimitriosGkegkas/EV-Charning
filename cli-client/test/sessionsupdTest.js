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
const reset = require('../src/utils').resetSessions;
//file source
let source = "./test/12Months.csv"

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
        this.timeout(5000)

        reset()
        setTimeout(() => {
            sinon.stub(console, "log").callsFake(mockedLog)
            login("admin","petrol4ever")
                let p =consoleOutput[1]
                setTimeout(() => {

                apikey = consoleOutput[1].split(' ')[2]
                console.log.restore()
                consoleOutput = []
                done()
            },1000)

    
            
        }, 1000);


    })



    it('sessionsupd: No source',function (done) {
        this.timeout(5000)

        sessionsupd(undefined,apikey)
        let p =consoleOutput[0]
        while(!p){
            p =consoleOutput[0]
        }
            expect(consoleOutput).to.be.deep.equal(["Please Check Your File Path"])
            done()
  
    });

    it('sessionsupd: Invalid source',function (done) {
        this.timeout(5000)


        sessionsupd("./../../notAValidSource.csv",apikey)
        let p =consoleOutput[0]
        while(!p){
            p =consoleOutput[0]
        }

        expect(consoleOutput).to.be.deep.equal(["Please Check Your File Path"])
        done()
       
    });

    it('sessionsupd: Wrong apikey',function (done) {
        this.timeout(5000)
        sessionsupd(source,"wrongAPIkey")
        let p =consoleOutput[0]
        while(!p){
            p =consoleOutput[0]
        }
            expect(consoleOutput).to.be.deep.equal(["Not Allowed"])
            done()
   
    });


})