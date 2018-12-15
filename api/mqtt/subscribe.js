const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Outages = require('../models/outages')
const db = require('../../dbconfig');
const moment = require('moment-timezone');
const client = mqtt.connect({
host: 'm15.cloudmqtt.com',
port: 16613,
username: 'ondnvmvh',
password: 'sr3TQ270Zowp'
 });



client.on('connect', function () {
client.subscribe('iot/interrupt')
//client.publish('esp/test', 'Hello mqtt')
})

client.on('message',async (topic, message, packet) => {
 console.log(moment().tz("Asia/Shanghai").format('YYYY-MM-DD HH:mm:ss'))
let MQTT_MESSAGE = await JSON.parse(packet.payload)

let node_id_mqtt =  MQTT_MESSAGE.nodeid
let power_state_mqtt =  MQTT_MESSAGE.state
let timestamp_mqtt =  MQTT_MESSAGE.timestamp

console.log(MQTT_MESSAGE)
if(power_state_mqtt == 'OFF'){

    db.query(`SELECT * FROM heroku_54ceab818c7a0f1.outage WHERE node_id = (select node_id from heroku_54ceab818c7a0f1.node where serial = '${node_id_mqtt}' AND status = 'off')`,function (err, results, fields) {
        if (err) throw err;
        //console.log(results.length)
        if(results.length == 0){
            console.log('new')
            db.query(`INSERT INTO heroku_54ceab818c7a0f1.outage(node_id, status,down_timestamp) SELECT node_id, 'off','${moment().tz("Asia/Shanghai").format('YYYY-MM-DD HH:mm:ss')}' FROM heroku_54ceab818c7a0f1.node WHERE serial = '${node_id_mqtt}'`,function (err, results, fields) {
                if (err) throw err;
                //console.log(results)
              });
        }
        else{
            console.log('repeated')
        }
      });

    
      
}
else if(power_state_mqtt == 'ON'){

  /////checks if last record
 await db.query(`SELECT COUNT(n.gateway_id) AS outage_count from heroku_54ceab818c7a0f1.node as n,heroku_54ceab818c7a0f1.gateway as g,heroku_54ceab818c7a0f1.outage as o where o.status = 'off' and g.gateway_id = (select gateway_id from heroku_54ceab818c7a0f1.node where serial = '${node_id_mqtt}') and g.gateway_id = n.gateway_id and (o.node_id = n.node_id) group by n.gateway_id`,async function (err, results, fields) {
    if (err) throw err;
    let rel = JSON.parse(JSON.stringify(results[0])).outage_count
    console.log(JSON.parse(JSON.stringify(results[0])).outage_count)
    if(rel === 1){
        console.log('last')
         await db.query(`UPDATE heroku_54ceab818c7a0f1.gateway SET actions = "Pending" WHERE gateway_id = (select gateway_id from heroku_54ceab818c7a0f1.node where serial = '${node_id_mqtt}')`,function (err, results, fields) {
            if (err) throw err;
           // console.log(results)
          });
    }
    else{
        console.log('not last')
    }
  });

  //////actual update

  await db.query(`UPDATE heroku_54ceab818c7a0f1.outage SET status = "on", up_timestamp = "${timestamp_mqtt}" WHERE node_id = (select node_id from heroku_54ceab818c7a0f1.node where serial = '${node_id_mqtt}') and status = 'off'`,function (err, results, fields) {
    if (err) throw err;
    console.log(results)
  });


}

})




module.exports = client;