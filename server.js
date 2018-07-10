const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser');

//bodyParser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express request logger middleware
app.use(morgan('dev'));

//API routes imports
const device = require('./api/routes/device');
//const reports = require('./api/routes/reports');

//mongoose connection URI
const options = {
  useNewUrlParser: true,
};
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://batsu:iotpa55@ds229701.mlab.com:29701/iotstarter`, options)
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err))


//API Routes middlewares
app.use('/device', device);
//app.use('/reports', reports);

//Global error handlers
app.use((req,res,next)=>{
  const error = new Error("API not found");
  error.status = 404;
  next(error);
})

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    error : {
      message: error.message
    }
  })
})



const port = process.env.port || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`))
