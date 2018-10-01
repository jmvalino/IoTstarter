const express = require('express');
const router = express.Router();
const Sensor_Nodes = require('../models/sensor_nodes')
const mongoose = require('mongoose');

//create new Sensor_nodes document
router.post('/', (req, res, next) => {
    let sensor_node = new Sensor_Nodes({
        edge: req.body.edge,
        owner: req.body.owner,
        dateactivated: Date.now()

    });

    sensor_node.save()
        .then(res.status(201).json({ message: 'Device Successfully Added To The System', info: device }))
        .catch(err => console.log(err))
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