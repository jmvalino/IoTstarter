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

let node_id_mqtt =  MQTT_MESSAGE.node_id
let power_state_mqtt =  MQTT_MESSAGE.status
let timestamp_mqtt =  MQTT_MESSAGE.timestamp

console.log(MQTT_MESSAGE)
if(power_state_mqtt == 'off'){

    db.query(`INSERT INTO outage (node_id,status,down_timestamp) VALUES ("${node_id_mqtt}","${power_state_mqtt}","${timestamp_mqtt}")`,function (err, results, fields) {
        if (err) throw err;
        console.log(results)
      });
      
}
else{

    db.query(`UPDATE heroku_54ceab818c7a0f1.outage SET status = "on", up_timestamp = "${timestamp_mqtt}" WHERE node_id = "${node_id_mqtt}";`,function (err, results, fields) {
        if (err) throw err;
        console.log(results)
      });

}

})




module.exports = client;