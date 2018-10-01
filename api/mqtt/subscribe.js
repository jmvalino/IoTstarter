const mqtt = require('mqtt')
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

})




module.exports = client;

