const mongoose = require('mongoose');

const sensornodesSchema = mongoose.Schema({
    user_id: String,
    node_id: String,
    date_registered: Date,
    longitude: String,
    latitude: String,

})

module.exports = mongoose.model('Sensor_Nodes', sensornodesSchema);