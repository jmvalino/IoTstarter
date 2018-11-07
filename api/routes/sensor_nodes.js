const express = require('express');
const router = express.Router();
const Sensor_Nodes = require('../models/sensor_nodes')
const mongoose = require('mongoose');
const db = require('../../dbconfig');
//create new Sensor_nodes document
router.post('/', (req, res, next) => {
    let serial = req.body.serial
    let lon = req.body.lon
    let lat = req.body.lat
    let user_id = req.body.user_id
    if(serial==null || user_id==null){
       return res.status(400).json({ message: 'Not Created', info: 'Supply all the necessaryy fields' })
    }

    db.query(`INSERT INTO node (serial,node_lon,node_lat,user_id) VALUES ("${serial}","${lon}","${lat}",${user_id})`,function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results)
      });
}
)

//query one device --- /device?id=xxxxxxx
router.get('/', (req, res, next) => {
    let __id = req.query.id
    let __limit = req.query.limit
    if (__id) {
        Sensor_Nodes.find({ _id: __id }, (err, sensor_node) => {
            if (err) { console.log(err) }

            res.send({
                sensor_node
            })

        })
    }
    else {

        Sensor_Nodes.find({}, (err, sensor_nodes) => {
            if (err) { console.log(err) }

            res.send({
                sensor_nodes
            })

        })
    }


})

//DELETE by _id ------ /device/remove?id=xxxxxxx
router.delete('/remove', (req, res, next) => {
    let __id = req.query.id;
    Sensor_Nodes.findByIdAndRemove({ _id: __id }, (err, result) => {
        if (err) {
            res.json({
                error: err
            })
        }
        else if (result === null) {
            res.json({
                message: 'Device Not Found'
            })
        }
        else {
            res.json({
                message: 'Device Sucessfully Removed From System',
                result: result
            })
        }
    })
})







module.exports = router;