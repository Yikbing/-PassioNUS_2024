const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create Schema
const Profileschema = new Schema({

    /*user_id: {
        /*type: mongoose.Schema.Types.ObjectId,
        ref: 'students', // Reference to the 'students' collection
        type:String,    
        required: true
    },*/
    name: {
        type:String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    year: {
        type:Number,
        required: true
    },
    gender: {
        type:String,
        required: true
    }
    

});

// collection part
const collection = new mongoose.model("user_data",Profileschema);

module.exports = collection;