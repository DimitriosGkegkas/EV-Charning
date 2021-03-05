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


exports.uploadToDB= (req, res) => {
	if(!req.file){
		res.status(400).json({message:"Please Check your File Path"})
		return
			
	}
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
			Session.count({}, function( err, count){
				if(err){
					console.log(err)
				}
				else{
				res.status(200).json({
					SeassionsInUploadedFile: InUploadedFile,
					SessionsImported: Imported,
					TotalSeassionsInDatabase: count
				})
			}
			});
			fs.unlink(filePath, (err) => {
				if(err){res.status(500).json({message:"Could not amound the uploaded file"})
			}
				
			}
			
			)
		})


}