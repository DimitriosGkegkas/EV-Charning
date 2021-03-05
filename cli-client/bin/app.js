#!/usr/bin/env node
require = require('esm')(module /*, options*/);
const utils= require('./../src/utils');
const access= require('./../src/access');
const yargs = require('yargs');
const bcrypt = require('bcrypt');
const dataAccess =require('../src/dataAccess');
const args = process.argv.slice(3)
const SCOPE = process.argv[2]

if(SCOPE==="healthcheck"){
    utils.healthcheck()
}

if(SCOPE==="resetsessions"){ 
    utils.resetSessions()
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
    if(!password){
        console.log("PLease GIVE ME MY PASSWORDs" )
    }
    
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