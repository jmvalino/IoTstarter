const express = require('express');
const router = express.Router();
const Outages = require('../models/outages')
const mongoose = require('mongoose');
const db = require('../../dbconfig');


router.post('/add', (req, res, next) => {
    let node_id = req.body.node_id
    let status = req.body.status
    if(node_id==null || status==null){
       return res.status(400).json({ message: 'Not Created', info: 'Supply all the necessaryy fields' })
    }

    db.query(`INSERT INTO outage (node_id,status) VALUES ("${node_id}","${status}")`,function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results)
      });
      
      next();
}

)
// db.query('SELECT * from user',function(err, result) {
//     if (err) throw err;
//     console.log(result)
//   });

//   db.end()
//create new Sensor_nodes document
router.get('/', (req, res, next) => {
    //a - user b - node c - outage d - gateway
    db.query(`SELECT  DISTINCT a.username, b.serial, b.node_lon, b.node_lat, d.barangay, d.municipality, d.province FROM user AS a, node AS b, outage AS c, gateway as d WHERE c.status = "off"`,function (err, results, fields) {
        if (err) throw err;
        res.status(200).json({outages:results})
      });
}

)

//DELETE by _id ------ /device/remove?id=xxxxxxx
// router.delete('/remove', (req, res, next) => {
//     let __id = req.query.id;
//     Sensor_Nodes.findByIdAndRemove({ _id: __id }, (err, result) => {
//         if (err) {
//             res.json({
//                 error: err
//             })
//         }
//         else if (result === null) {
//             res.json({
//                 message: 'Device Not Found'
//             })
//         }
//         else {
//             res.json({
//                 message: 'Device Sucessfully Removed From System',
//                 result: result
//             })
//         }
//     })
// })







module.exports = router;