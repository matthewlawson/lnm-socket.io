// monitorMessageSending.js
const { messageTypes, global } = require('./constants');
const io = require('./io');
const debug = require('debug')(`${global.APP_NAME}:monitorMessageSending`);

module.exports = () => {
  io.on('connection', (client) => {
    //Receive from client broadcast to everyone - but this client.
    client.on(messageTypes.SEND_MESSAGE, (message) => {
      debug(`Message received & broadcast: ${message}`);
      io.emit(messageTypes.MESSAGE_TEXT, message);
    });
  });
};
