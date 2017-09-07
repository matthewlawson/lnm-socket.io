// monitorJoinLeaves.js
const { messageTypes, global } = require('./constants');
const io = require('./io');
const debug = require('debug')(`${global.APP_NAME}:monitorJoinLeaves`);

module.exports = () => {
  io.on('connection', (client) => {
    broadcastJoinNotification(client);
    broadcastConnectionCount();
    client.on('disconnect', () => {
      broadcastConnectionCount();
      broadcastDisconnect();
    });
  });
}

function broadcastDisconnect() {
  debug('send disconnect message');
  io.emit(messageTypes.MESSAGE_TEXT, `has disconnected`);
}
function broadcastConnectionCount() {
  io.clients((error, clients) => {
    if (error) throw error;
    const currentlyConnected = `${clients.length} currently connected`;
    debug(currentlyConnected);
    io.emit(messageTypes.MESSAGE_TEXT, currentlyConnected);
  });
}

function broadcastJoinNotification(client) {
  const joinNotification = `${client.id} has joined the room`
  debug(joinNotification);
  io.emit(messageTypes.MESSAGE_TEXT, joinNotification);
}
