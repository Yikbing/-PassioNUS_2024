const { boolean } = require('joi');
const mongoose = require('mongoose');

const interestsSchema = new mongoose.Schema({

    Sports: {
        type:Boolean,
        required: true
    },
    Music: {
        type:Boolean,
        required: true
    },
    Art: {
        type:Boolean,
        required: true
    },
    Cooking: {
        type:Boolean,
        required: true
    },
    Volunteering: {
        type:Boolean,
        required: true
    },
    Video_Games: {
        type:Boolean,
        required: true
    },
    Dance: {
        type:Boolean,
        required: true
    }
})

const collection = new mongoose.model("interests",interestsSchema);

module.exports = collection;