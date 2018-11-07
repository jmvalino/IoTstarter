const express = require('express');
const app = express();
const mqttSub = require('./mqtt/subscribe')
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
// const CONFIG =  require('../dbconfig')

//const connection = require('../config')
//bodyParser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express request logger middleware
app.use(morgan('dev'));

//API routes imports

const device = require('./routes/device');
const users = require('./routes/users');
const sensor_nodes = require('./routes/sensor_nodes');
const outages = require('./routes/outages');
//const auth = require('./routes/auth')
//const reports = require('./api/routes/reports');

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host: 'us-cdbr-iron-east-01.cleardb.net',
//   user: 'b08d9862edc985',
//   password: 'bf90228c',
//   database: 'heroku_54ceab818c7a0f1'
// });

// connection.connect();
 
// connection.query('SELECT * from user', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });
 
// connection.end();


app.use((req, res, next) => {
  mqttSub.subscribe
  next();
});

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to the API'
//   })
// })
app.use(express.static('client/build'))

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}
//API Routes middlewares
//app.use('/api/auth',auth)

//API JWT checker
// app.use(function(req, res, next) {
//   var token = req.headers['x-access-token'];
//   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
//   jwt.verify(token, CONFIG.SECRET, function(err, decoded) {
//     if (err) return res.status(500).send({ auth: false, message: 'No Access Permission' });
    
//     next()
//   });
// });

app.use('/api/device', device);
app.use('/api/user', users);
app.use('/api/node', sensor_nodes);
app.use('/api/outage', outages);

//app.use('/reports', reports);

//Global error handlers
app.use((req, res, next) => {
  const error = new Error("Not Authorized");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

//app.use(mqttSub.subscribe);





const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`SERVER RUNNNING`)
})