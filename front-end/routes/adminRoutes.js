const express = require('express');
const route = express.Router();
const admin = require("./../controller/admin")
const auth = require("./../controller/auth")
const multer = require('multer');
const fileUpload = require("./../controller/fileUploadController");


route.get('/addUser',auth.check,admin.addUserPage);
route.post('/admin/usermod',auth.check,admin.Admin);

route.get('/findUser',auth.check,admin.findUserPage);
route.get('/admin/users/?',auth.check,admin.findUser);


route.post('/admin/sessionsupd',auth.check, multer({ storage: fileUpload.storage, fileFilter: fileUpload.csvFilter }).single("file"),admin.sessionsupd);
route.get('/uploadSessions',auth.check,admin.uploadSessions);

module.exports = route;
