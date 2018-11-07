var mysql = require('mysql');
var connection = mysql.createPool({
    connectionLimit : 10,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b08d9862edc985',
    password: 'bf90228c',
    database: 'heroku_54ceab818c7a0f1'
});
module.exports = connection;