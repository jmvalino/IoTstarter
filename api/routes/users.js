const express = require('express');
const router = express.Router();
const Users = require('../models/users')
const mongoose = require('mongoose');

//create new device document
router.post('/add', (req, res, next) => {
    let email = req.body.email
    let mobile_number = req.body.mobile_number
    if(email==null || mobile_number==null){
       return res.status(400).json({ message: 'Not Created', info: 'Supply all the necessaryy fields' })
    }
    let user = new Users({
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        date_registered: Date.now()

    });

    user.save()
        .then(res.status(201).json({ message: 'Account Created', info: user }))
        .catch(err => console.log(err))
}
)

//query one device --- /device?id=xxxxxxx
router.get('/', (req, res, next) => {
    let __id = req.query.id
    let __limit = req.query.limit
    if (__id) {
        Device.find({ _id: __id }, (err, user) => {
            if (err) { console.log(err) }

            res.send({
                user
            })

        })
    }
    else {

        Users.find({}, (err, users) => {
            if (err) { console.log(err) }

            res.send({
                users
            })

        })
    }


})

//DELETE by _id ------ /device/remove?id=xxxxxxx
router.delete('/remove', (req, res, next) => {
    let __id = req.query.id;
    Users.findByIdAndRemove({ _id: __id }, (err, result) => {
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