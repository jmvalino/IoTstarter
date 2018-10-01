const mongoose = require('mongoose');

const outagesSchema = mongoose.Schema({
    node_id: String,
    timestamp: String,
    actions: [String]
})

module.exports = mongoose.model('Outages', outagesSchema);