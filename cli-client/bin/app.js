#!/usr/bin/env node
require = require('esm')(module /*, options*/);
const utils= require('./../src/utils');

const args = process.argv.slice(3)
const SCOPE = process.argv[2]

if(SCOPE==="healthcheck"){
    utils.healthcheck()
}

if(SCOPE==="resetsessions"){ 
    utils.resetSessions()
}




