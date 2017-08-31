const server = require('http').createServer();
var io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

io.on('connection', (client) => {
  console.log('connection');

  io.emit('message', {body: `hello ${client.id}`});
});


io.listen(3000);