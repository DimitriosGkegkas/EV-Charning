const fileUpload = require("./../controller/fileUploadController");
const express = require('express');
const route = express.Router();
const multer = require('multer');

const csv = require('csv-parser');
const fs = require('fs');
const Session= require('./../model/session');

// POST: Create User
route.post('/admin/system/sessionupd',multer({ storage: fileUpload.storage, fileFilter: fileUpload.csvFilter }).single("file"),
    (req, res) => {
        const filePath = req.file.path;
        let InUploadedFile = 0;
        let Imported = 0 
        fs.createReadStream(filePath).pipe(csv()).on('data', (row) => {
            InUploadedFile=InUploadedFile+1;
            const session = new Session({
                sessionID : row["sessionID"],
                connectionTime : row["connectionTime"],
                disconnectTime : row["disconnectTime"],
                doneChargingTime : row["doneChargingTime"],
                kWhDelivered : row["kWhDelivered"]
            })

            session.save().then(()=> {Imported =Imported +1;})
            .catch(err => {
                if (err.code === 11000){
                    
                }
                else {
                    console.log(err)
                }
            })
            
          })
          .on('end', () => {
              Session.find().exec(function (err, results) {
                var SeassionsInDatabase = results.length
                res.status(200).json({
                    SeassionsInUploadedFile:InUploadedFile,
                    SessionsImported:Imported,
                    TotalSeassionsInDatabase:SeassionsInDatabase
                })
              });
              fs.unlink(filePath , (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            }
              )
          })

        
    }
);

module.exports= route;


