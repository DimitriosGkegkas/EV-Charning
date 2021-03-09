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
const admin= require('./../src/admin');

if(SCOPE==="healthcheck"){
    utils.healthcheck()
}


else if(SCOPE==="resetsessions"){ 
    utils.resetSessions()
}

else if(SCOPE==="logout")
{
    access.logout()
   
    
    
}


else if(SCOPE==="Admin"){
    if(process.argv[3]==="--healthcheck"){
        utils.healthcheck()
    }
    else if (process.argv[3]==="--resetsessions"){
        utils.resetSessions()
    }
    else if (process.argv[3]==="--users"){
        admin.findUser(process.argv[4])
    }
    else if (process.argv[3]==="--sessionsupd"){
        admin.sessionsupd(process.argv[4])
    }
    else if (process.argv[3]==="--usermod"){
        let username
        let password
        if(process.argv[4]==="--username"){
            username = process.argv[5]
        }
        else {
             password = process.argv[5]
        }
        if(process.argv[6]==="--username"){
             username = process.argv[7]
        }
        else {
            password = process.argv[7]
        }
        admin.Admin(username,password);
    }
}





const argvLogin = yargs
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
if (argvLogin._.includes('login')) {
    const password = argvLogin.password 
    const username = argvLogin.username

    access.login(username,password)

}






const argvPerPoint = yargs
    .command('SessionsPerPoint', '', {
        point: {
            description: '',
            type: 'string',
        },
        datefrom: {
            description: '',
            type: 'data',
        },
        dateto: {
            description: '',
            type: 'data',
        }
    })
    .help()
    .argv;

if (argvPerPoint._.includes('SessionsPerPoint')) {

    const point = argvPerPoint.point
    const datefrom = argvPerPoint.datefrom
    const dateto = argvPerPoint.dateto
    dataAccess.perPoint(point, datefrom, dateto);
}

const argvSessionsPerStation = yargs
    .command('SessionsPerPoint', '', {
        point: {
            description: '',
            type: 'string',
        },
        datefrom: {
            description: '',
            type: 'data',
        },
        dateto: {
            description: '',
            type: 'data',
        }
    })
    .help()
    .argv;

if (argvSessionsPerStation._.includes('SessionsPerStation')) {
    const stationID = argvSessionsPerStation.station
    const periodFrom = argvSessionsPerStation.datefrom
    const periodTo = argvSessionsPerStation.dateto
    dataAccess.SessionsPerStation(stationID, periodFrom, periodTo);
}



const argvPerEV = yargs
    .command('SessionsPerEV', '', {
        ev: {
            description: '',
            type: 'string',
        },
        datefrom: {
            description: '',
            type: 'data',
        },
        dateto: {
            description: '',
            type: 'data',
        }
    })
    .help()
    .argv;

if (argvPerEV._.includes('SessionsPerEV')) {

    const ev = argvPerPoint.ev
    const datefrom = argvPerPoint.datefrom
    const dateto = argvPerPoint.dateto
    dataAccess.perEV(ev, datefrom, dateto);
}

const argvPerProvider = yargs
    .command('SessionsPerProvider', '', {
        provider: {
            description: '',
            type: 'string',
        },
        datefrom: {
            description: '',
            type: 'data',
        },
        dateto: {
            description: '',
            type: 'data',
        }
    })
    .help()
    .argv;

if (argvPerEV._.includes('SessionsPerProvider')) {

    const provider = argvPerPoint.provider
    const datefrom = argvPerPoint.datefrom
    const dateto = argvPerPoint.dateto
    dataAccess.perProvider(provider, datefrom, dateto);
}





