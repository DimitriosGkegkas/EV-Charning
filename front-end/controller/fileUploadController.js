const multer = require("multer");
const csv = require('csv-parser');
const fs = require('fs');


exports.csvFilter = (req, file, cb) => {
  console.log(file.mimetype)
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    if(file.mimetype.includes("application/vnd.ms-excel")){
      cb(null, true);
    }
    else{cb("Please upload only csv file.", false);}
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

