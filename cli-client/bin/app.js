#!/usr/bin/env node
require = require('esm')(module /*, options*/);
const utils= require('./../src/utils');
const access= require('./../src/access');
const yargs = require('yargs');
const bcrypt = require('bcrypt');

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

if(SCOPE==="logout")
{
    access.logout()
}