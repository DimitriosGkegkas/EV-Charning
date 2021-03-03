const multer = require("multer");
const csv = require('csv-parser');
const fs = require('fs');
const Session = require('./../model/session');

exports.csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../resources/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var mongoose = require('mongoose');
var session= require('./../model/session');

exports.upload = function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
	
	var authorFile = req.files.file;
	var authors = [];
		
	csv
	 .fromString(authorFile.data.toString(), {
		 headers: true,
		 ignoreEmpty: true
	 })
	 .on("data", function(data){
		 data['_id'] = new mongoose.Types.ObjectId();
		 
		 authors.push(data);
	 })
	 .on("end", function(){
        session.create(authors, function(err, documents) {
			if (err) throw err;
		 });
		 
		 res.send(authors.length + ' authors have been successfully uploaded.');
	 });
};


exports.uploadToDB= (req, res) => {
	const filePath = req.file.path;
	let InUploadedFile = 0;
	let Imported = 0
	fs.createReadStream(filePath).pipe(csv()).on('data', (row) => {
		InUploadedFile = InUploadedFile + 1;
		const session = new Session({
			sessionID: row["sessionID"],
			connectionTime:  row["connectionTime"] === "null" ? null: row["connectionTime"],
			disconnectTime:  row["disconnectTime"] === "null" ? null: row["disconnectTime"],
			doneChargingTime: row["doneChargingTime"] === "null" ? null: row["doneChargingTime"] ,
			kWhDelivered: row["kWhDelivered"] === "null" ? null: row["kWhDelivered"] ,
			pointID: row["spaceID"] === "null" ? null: row["spaceID"] ,
			stationID: row["stationID"] === "null" ? null: row["stationID"] ,
			userID: row["userID"]=== "null" ? null: row["userID"],
			payment: row["payment"]  ? row["payment"] : null,
			protocol: row["protocol"]  ? row["protocol"] : null,
			vehicleType: row["vehicleType"]  ? row["vehicleType"] : null,
		})

		session.save().then(() => { Imported = Imported + 1; })
			.catch(err => {
				if (err.code === 11000) {

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
					SeassionsInUploadedFile: InUploadedFile,
					SessionsImported: Imported,
					TotalSeassionsInDatabase: SeassionsInDatabase
				})
			});
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(err)
					return
				}
			}
			)
		})


}