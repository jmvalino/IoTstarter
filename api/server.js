const express = require('express');
const app = express();
const mqttSub = require('./mqtt/subscribe')
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const CONFIG =  require('../config')
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
const auth = require('./routes/auth')
//const reports = require('./api/routes/reports');

//mongoose connection URI
const options = {
  useNewUrlParser: true,
};
mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.DB, options)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err))


// mqttSub.on('connect', function () {
//   mqttSub.subscribe('esp/test')
//   //client.publish('esp/test', 'Hello mqtt')
// })

// mqttSub.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   mqttSub.end()
// })

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
app.use('/api/auth',auth)

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
app.use('/api/users', users);
app.use('/api/sensor_nodes', sensor_nodes);
app.use('/api/outages', outages);

//app.use('/reports', reports);

//Global error handlers
app.use((req, res, next) => {
  const error = new Error("API not found");
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