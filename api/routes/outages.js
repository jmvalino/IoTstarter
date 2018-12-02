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
router.get('/', (req, res) => {
    //a - user b - node c - outage d - gateway ////
    let gateway_id = req.query.gateway_id
    db.query(`SELECT  c.outage_id,c.down_timestamp, a.email, c.node_id, d.longitude, d.latitude, d.barangay, d.municipality, d.province FROM heroku_54ceab818c7a0f1.user AS a, heroku_54ceab818c7a0f1.node AS b, heroku_54ceab818c7a0f1.outage AS c, heroku_54ceab818c7a0f1.gateway as d WHERE c.status = "off"  and ((b.node_id = c.node_id  and b.gateway_id = "${gateway_id}")) GROUP BY c.outage_id`,function (err, results, fields) {
        if (err) throw err;
        res.status(200).json({outages:results})
      });
}

)

/////////////////////Consolidted///////////////
router.get('/consolidated', (req, res) => {
    //a - user b - node c - outage d - gateway ////
    db.query(`SELECT COUNT(n.gateway_id) AS outage_count, n.gateway_id, g.barangay from heroku_54ceab818c7a0f1.node as n,heroku_54ceab818c7a0f1.gateway as g,heroku_54ceab818c7a0f1.outage as o where o.status = 'off' and g.gateway_id = n.gateway_id and (o.node_id = n.node_id) group by n.gateway_id`,function (err, results, fields) {
        if (err) throw err;
        res.status(200).json({consolidated_outages:results})
      });
})

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