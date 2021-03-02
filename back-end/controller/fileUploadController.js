const multer = require("multer");

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
    console.log(file.originalname);
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var csv = require('fast-csv');
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
