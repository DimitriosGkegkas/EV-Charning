const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    
    username: {
        type: String,
        required: true,
        unique: true 
    },

    email: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true
    },

    apiKey: {
        type: String,
        required: false
    },

});

module.exports = mongoose.model("user", userSchema);

