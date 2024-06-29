const mongoose = require('mongoose');
const {Schema} = mongoose;

const EventSchema = new Schema({
    title:String,
    summary:String,
    date:String,
    venue:String,
    content:String,
    cover:String,
});

const eventModel = mongoose.model('Event', EventSchema);

module.exports = eventModel;