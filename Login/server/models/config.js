const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'students'  // Reference to the students collection
    },
    name: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

// Collection part
const collection = mongoose.model("user_data", ProfileSchema);

module.exports = collection;
