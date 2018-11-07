const express = require('express');
const router = express.Router();
const Users = require('../models/users')
const mongoose = require('mongoose');
const db = require('../../dbconfig');
//create new device document
router.post('/', (req, res, next) => {
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    let mobile_number = req.body.mobile_number
    if(email==null || mobile_number==null){
       return res.status(400).json({ message: 'Not Created', info: 'Supply all the necessaryy fields' })
    }

    db.query(`INSERT INTO user (first_name,last_name,email,mobile_number) VALUES ("${first_name}","${last_name}","${email}","${mobile_number}")`,function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results)
      });
}
)

//query one device --- /device?id=xxxxxxx
router.get('/', (req, res, next) => {
    db.query('SELECT * from user',function(err, result) {
        if (err) throw err;
        res.status(200).json(result)
      });

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