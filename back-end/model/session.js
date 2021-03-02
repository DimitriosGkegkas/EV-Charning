const express = require('express');
const { Double } = require('mongodb');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema ({
    
    sessionID: {
        type: String,
        required: true,
        index: true,
        unique: true 

    },

    connectionTime: {
        type: Date,
    },

    disconnectTime: {
        type: Date,
    },

    doneChargingTime: {
        type: Date,
    },
    kWhDelivered: {
        type: Number,
    },


});

module.exports = mongoose.model("session", sessionSchema );