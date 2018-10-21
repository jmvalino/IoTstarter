const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const outagesSchema = mongoose.Schema({
    _id: ObjectId, 
    node_id: String,
    power_up_timestamp: String,
    power_down_timestamp: String,
    long:String,
    lat:String,
})

module.exports = mongoose.model('Outages', outagesSchema);