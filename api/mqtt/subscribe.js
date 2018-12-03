const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Outages = require('../models/outages')
const db = require('../../dbconfig');
const client = mqtt.connect({
host: 'm14.cloudmqtt.com',
port: 19527,
username: 'heroku-server',
password: '1234abcD'
 });



client.on('connect', function () {
client.subscribe('iot/interrupt')
//client.publish('esp/test', 'Hello mqtt')
})

client.on('message',async (topic, message, packet) => {
 
let MQTT_MESSAGE = await JSON.parse(packet.payload)

let node_id_mqtt =  MQTT_MESSAGE.nodeid
let power_state_mqtt =  MQTT_MESSAGE.state
let timestamp_mqtt =  MQTT_MESSAGE.timestamp

console.log(MQTT_MESSAGE)
if(power_state_mqtt == 'off'){

    db.query(`SELECT * FROM heroku_54ceab818c7a0f1.outage WHERE node_id = (select node_id from heroku_54ceab818c7a0f1.node where serial = '${node_id_mqtt}')`,function (err, results, fields) {
        if (err) throw err;
        console.log(results.length)
        if(results.length == 1){
            console.log('new')
            db.query(`INSERT INTO heroku_54ceab818c7a0f1.outage(node_id, status,down_timestamp) SELECT node_id, 'off','201820122' FROM heroku_54ceab818c7a0f1.node WHERE serial = '${node_id_mqtt}'`,function (err, results, fields) {
                if (err) throw err;
                //console.log(results)
              });
        }
        else{
            console.log('repeated')
        }
      });

    
      
}
else{

  

    db.query(`UPDATE heroku_54ceab818c7a0f1.outage SET status = "on", up_timestamp = "${timestamp_mqtt}" WHERE node_id = (select node_id from heroku_54ceab818c7a0f1.node where serial = '${node_id_mqtt}') and status = 'off'`,function (err, results, fields) {
        if (err) throw err;
        console.log(results)
      });

}

})




module.exports = client;