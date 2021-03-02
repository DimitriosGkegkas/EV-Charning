const fileUpload = require("./../controller/fileUploadController");
const express = require('express');
const route = express.Router();
const multer = require('multer');



// POST: Create Session
route.post('/admin/system/sessionupd', multer({ storage: fileUpload.storage, fileFilter: fileUpload.csvFilter }).single("file"),
fileUpload.uploadToDB
);

module.exports = route;


