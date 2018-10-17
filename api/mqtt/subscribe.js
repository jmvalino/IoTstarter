const mqtt = require('mqtt')
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
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())

  let outage = new Outages({
    edge: message.node_id,
    timestamp: Date.now()

});

outage.save()
    .then(console.log('saved'))
    .catch(err => console.log(err))


})




module.exports = client;

