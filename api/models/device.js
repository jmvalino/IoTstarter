const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    edge: String,
    owner: String,
    dateactivated: Date
})

module.exports = mongoose.model('Device', deviceSchema);