const express = require('express');
const route = express.Router();
const admin = require("./../controller/admin")
const auth = require("./../controller/auth")
const multer = require('multer');
const fileUpload = require("./../controller/fileUploadController");

route.post('/admin/usermod',auth.check,admin.Admin);
route.get('/admin/users/:username',auth.check,admin.findUser);
route.post('/admin/sessionsupd',auth.check, multer({ storage: fileUpload.storage, fileFilter: fileUpload.csvFilter }).single("file"),admin.sessionsupd);

module.exports = route;
