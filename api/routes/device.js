const express = require('express');
const router = express.Router();
const Device = require('../models/device')
const mongoose = require('mongoose');

//create new device document
router.post('/', (req, res, next) => {
    let device = new Device({
        edge: req.body.edge,
        owner: req.body.owner,
        dateactivated: Date.now()

    });

    device.save()
        .then(res.status(201).json({ message: 'Device Successfully Added To The System', info: device }))
        .catch(err => console.log(err))
}
)

//query one device --- /device?id=xxxxxxx
router.get('/', (req, res, next) => {
    let __id = req.query.id
    let __limit = req.query.limit
    if (__id) {
        Device.find({ _id: __id }, (err, device) => {
            if (err) { console.log(err) }

            res.send({
                device
            })

        })
    }
    else {

        Device.find({}, (err, devices) => {
            if (err) { console.log(err) }

            res.send({
                devices
            })

        })
    }


})

//DELETE by _id ------ /device/remove?id=xxxxxxx
router.delete('/remove', (req, res, next) => {
    let __id = req.query.id;
    Device.findByIdAndRemove({ _id: __id }, (err, result) => {
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