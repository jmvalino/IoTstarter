const express = require('express');
const reports = express();
const querystring = require('querystring');





//query one device
reports.get('/',(req,res,next) => {
    let id = req.query.deviceId;
    res.json({
        message: id
    })
    })

module.exports = reports