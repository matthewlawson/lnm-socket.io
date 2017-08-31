const server = require('http').createServer();
var io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

io.on('connection', (client) => {
  console.log('connection');

  io.emit('message', {body: `hello ${client.id}`});

  client.on('action', (action) => {
    if(action.type === 'server/hello'){
      console.log('Got hello data!', action.data);
      client.emit('action', {type:'message', text:'good day!'});
    }
  });
});


io.listen(3000);