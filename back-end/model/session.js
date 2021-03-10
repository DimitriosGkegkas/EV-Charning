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

    pointID: {
        type: String,
    },

    stationID: {
        type: String,
    },
    userID: {
        type: String,
    },
    payment:{
        type: String,
    },
    protocol:{
        type: String,
    },
    vehicleType:{
        type: String,
    },
    provider:{
        type: String,
    },
    operator:{
        type: String,
    },
    CostPerKWh:{
        type: Number,
    },
    totalCost:{
        type: Number,
    },

});

module.exports = mongoose.model("session", sessionSchema );