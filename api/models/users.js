const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    email: String,
    mobile_number: String,
    date_registered: Date
})

module.exports = mongoose.model('Users', usersSchema);