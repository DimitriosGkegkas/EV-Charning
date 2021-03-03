const fileUpload = require("./../controller/fileUploadController");
const express = require('express');
const route = express.Router();
const multer = require('multer');
const isAuth = require('./../controller/is-auth')


// POST: Create Session
route.post('/admin/system/sessionsupd',isAuth, multer({ storage: fileUpload.storage, fileFilter: fileUpload.csvFilter }).single("file"),
fileUpload.uploadToDB
);

module.exports = route;


