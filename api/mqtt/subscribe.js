const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Outages = require('../models/outages')
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

if(power_state_mqtt == 'off'){


    const outage = new Outages({
        _id: new mongoose.Types.ObjectId(),
        node_id : node_id_mqtt,
        power_down_timestamp:timestamp_mqtt,
        power_up_timestamp: ''
        });
        
outage.save()
.then(console.log('saved'))
.catch(err => console.logs(err))



}
else{

Outages.updateOne({ node_id: node_id_mqtt, power_up_timestamp: '' },{power_up_timestamp: timestamp_mqtt}, (err, outages) => {
if (err) { console.log(err) }
console.log(outages)

})

}

})




module.exports = client;