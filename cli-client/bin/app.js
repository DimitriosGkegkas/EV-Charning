#!/usr/bin/env node
require = require('esm')(module /*, options*/);
const utils= require('./../src/utils');
const access= require('./../src/access');
const yargs = require('yargs');
const bcrypt = require('bcrypt');
const { string } = require('yargs');
const dataAccess =require('../src/dataAccess');

const args = process.argv.slice(3)
const SCOPE = process.argv[2]

if(SCOPE==="healthcheck"){
    utils.healthcheck()
}

if(SCOPE==="resetsessions"){ 
    utils.resetSessions()
}




const argv = yargs
    .command('login', '', {
        password: {
            description: '',
            type: 'string',
        },
        username: {
            description: '',
            type: 'string',
        }
    })
    .help()
    .argv;


if (argv._.includes('login')) {
    const password = argv.password 
    const username = argv.username
    if(!password){
        console.log("PLease GIVE ME MY PASSWORDs" )
    } 
    access.login(username,password)
}

const argvSessionsPerStation = yargs
    .command('SessionsPerPoint', '', {
        point: {
            description: '',
            type: 'string',
        },
        from: {
            description: '',
            type: 'data',
        },
        to: {
            description: '',
            type: 'data',
        }
    })
    .help()
    .argv;

if (argvSessionsPerStation._.includes('SessionsPerStation')) {
    const stationID = argvSessionsPerStation.station
    const periodFrom = argvSessionsPerStation.from
    const periodTo = argvSessionsPerStation.to
    dataAccess.SessionsPerStation(stationID, periodFrom, periodTo);
}



