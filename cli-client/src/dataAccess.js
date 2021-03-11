const request = require('request');
const https = require('https');

const fs = require('fs');

exports.SessionsPerStation = (stationID, datefrom, dateto, apikey) => {
    if(!stationID){
        console.log("Please Provide a station Id")
        return
    }
    if(!datefrom){
        console.log("Please Provide a Date From")
        return
    }
    if(!dateto){
        console.log("Please Provide a Date To")
        return
    }
    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerStation'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let auth
    try {auth= "Bearer "+fs.readFileSync('softeng20bAPI.token');
    }
    catch{
        console.log("Access denied")
        return
    }

    request({
        url: "https://localhost:8765/SessionPerStation/" + stationID +"/"+ datefrom + "/" + dateto
        , method: 'GET'
        , agent: agent
        , headers: {
            "Authorization": auth,
            "x-api-key": apikey
        }
    }, function (err, resp, body) {
        if(JSON.parse(body).message){
            if(resp.statusCode===404){
                console.log("Please Check the API")
            }
            else{console.log( JSON.parse(body).message)
            }
        }
        else{
            console.log( JSON.parse(body))
            
        }  
    });
}

exports.perPoint = (point, datefrom, dateto, apikey) =>{

    if(!point){
        console.log("Please Provide a Point Id")
        return
    }
    if(!datefrom){
        console.log("Please Provide a Date From")
        return
    }
    if(!dateto){
        console.log("Please Provide a Date To")
        return
    }

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerPoint'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);
    
    let auth
    try {auth= "Bearer "+fs.readFileSync('softeng20bAPI.token');
    }
    catch{
        console.log("Access denied")
        return
    }

    request({
        url: "https://localhost:8765/SessionPerPoint/"+point+"/"+datefrom+"/"+dateto
        , method: 'GET'
        , agent: agent
        , headers: {
            "Authorization": auth,
            "x-api-key": apikey
        }
    }, function (err, resp, body) {
        if(JSON.parse(body).message){
            if(resp.statusCode===404){
                console.log("Please Check the API")
            }
            else{console.log( JSON.parse(body).message)
            }
        }
        else{
            console.log( JSON.parse(body))
        }
        
    });
}


exports.perEV = (ev, datefrom, dateto, apikey) =>{
    if(!ev){
        console.log("Please Provide a EV Id")
        return
    }
    if(!datefrom){
        console.log("Please Provide a Date From")
        return
    }
    if(!dateto){
        console.log("Please Provide a Date To")
        return
    }


    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerEV'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let auth
    try {auth= "Bearer "+fs.readFileSync('softeng20bAPI.token');
    }
    catch{
        console.log("Access denied")
        return
    }

    request({
        url: "https://localhost:8765/SessionPerEV/"+ev+"/"+datefrom+"/"+dateto
        , method: 'GET'
        , agent: agent
        , headers: {
            "Authorization": auth,
            "x-api-key": apikey
        }
    }, function (err, resp, body) {
      if(JSON.parse(body).message){
            if(resp.statusCode===404){
                console.log("Please Check the API")
            }
            else{console.log( JSON.parse(body).message)
            }
        }
        else{
            console.log( JSON.parse(body))
            
        }  
    });
}



exports.perProvider = (provider, datefrom, dateto, apikey) =>{
    if(!provider){
        console.log("Please Provide a provider Id")
        return
    }
    if(!datefrom){
        console.log("Please Provide a Date From")
        return
    }
    if(!dateto){
        console.log("Please Provide a Date To")
        return
    }


    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerProvider'
        , rejectUnauthorized: false
    };
    const agent = new https.Agent(agentOptions);

    let auth
    try {auth= "Bearer "+fs.readFileSync('softeng20bAPI.token');
    }
    catch{
        console.log("Access denied")
        return
    }
    
    request({
        url: "https://localhost:8765/SessionPerProvider/"+provider+"/"+datefrom+"/"+dateto

        , method: 'GET'
        , agent: agent
        , headers: {
            "Authorization": auth,
            "x-api-key": apikey
        }
    }, function (err, resp, body) {
        if(JSON.parse(body).message){
            if(resp.statusCode===404){
                console.log("Please Check the API")
            }
            else{console.log( JSON.parse(body).message)
            }
        }
        else{
            console.log( JSON.parse(body))
            
        }  
    });

}

