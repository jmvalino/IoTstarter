const express = require('express');
const router = express.Router();
const Outages = require('../models/outages')
const mongoose = require('mongoose');

//create new Sensor_nodes document
router.post('/', (req, res, next) => {
    let outage = new Outages({
        edge: req.body.edge,
        owner: req.body.owner,
        dateactivated: Date.now()

    });

    outage.save()
        .then(res.status(201).json({ message: 'Device Successfully Added To The System', info: device }))
        .catch(err => console.log(err))
}
)

//query one device --- /device?id=xxxxxxx
router.get('/', (req, res, next) => {
    let __id = req.query.id
    let __limit = req.query.limit
    if (__id) {
        Outages.find({ _id: __id }, (err, outage) => {
            if (err) { console.log(err) }

            res.send({
                outage
            })

        })
    }
    else {

        Outages.find({}, (err, outages) => {
            if (err) { console.log(err) }

            res.send({
                outages
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