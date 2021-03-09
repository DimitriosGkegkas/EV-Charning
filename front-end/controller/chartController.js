const https = require('https')
const request =require('request')


function getLists (input) {
    let returnListEnergy =[];
    let returnListCount=[];
    let current_day="0";
    let energy_sum=0;
    let session_count=0;
    for (row of input){
        let dt= row.StartedOn.slice(0,10);
        if(current_day === "0") {
            current_day=dt
            session_count=1;
        }
        if(current_day===dt){
            energy_sum = energy_sum +row.EnergyDelivered;
            session_count=session_count+1;
        }
        else{
            
            returnListEnergy.push({ "x":current_day,"y":Number(energy_sum.toFixed(2))})
            returnListCount.push({ "x":current_day,"y":session_count})
            energy_sum=row.EnergyDelivered;  
            session_count=1;
            current_day=dt
        }


    }
    return {returnListEnergy:returnListEnergy,  returnListCount:returnListCount}
}


exports.chart = (req, res, next) => {
    
    const pointID = "CA-311"
    const periodFrom = "2019-06-01 00:00:00"
    const periodTo = "2019-12-01 00:00:00"

    const agentOptions = {
        host: 'localhost'
        , port: '8765'
        , path: '/SessionsPerPoint'
        , rejectUnauthorized: false
    };
    let token
    try {
        token = req.cookies.token
    }
    catch {
        console.log("Access Denied")
        return
    }
    const auth = "Bearer " + token;
    const agent = new https.Agent(agentOptions);
    request({
        url: "https://localhost:8765/SessionPerPoint/"+pointID+"/"+periodFrom+"/"+periodTo
        , method: 'GET'
        , agent: agent
        , headers: {
            "Authorization": auth
        }
    }, function (err, resp, body) {
       let ret = getLists ( JSON.parse(body).ChargingSessionsList );
       let returnListEnergy= ret.returnListEnergy
       let returnListCount=ret.returnListCount

    res.render("chart",{kwh:returnListEnergy,count:returnListCount})


});
}