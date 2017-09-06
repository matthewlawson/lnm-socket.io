const server = require('http').createServer();
const io = require('./connection');

const messageTypes = require('./messageTypes');

io.on('connection', (client) => {
  io.emit(messageTypes.MESSAGE_TEXT, `${client.id} has joined the room`);

  //Receive from client broadcast to everyone.
  client.on(messageTypes.SEND_MESSAGE, (message) => {
    io.emit(messageTypes.MESSAGE_TEXT, message);
  });
  
});

