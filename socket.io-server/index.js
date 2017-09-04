const server = require('http').createServer();
var io = require('socket.io')(server, {
  // Prioritise websocket first.
  transports: ['websocket', 'polling']
});

const messageTypes = require('./messageTypes');

io.on('connection', (client) => {
  console.log('connection');
  setInterval( () => {
    const payload = `hello ${client.id}`
    console.log(`sending payload: ${JSON.stringify(payload)}`);
    io.emit(messageTypes.MESSAGE_TEXT, payload);
  }, 10000);

  // client.on('action', (action) => {
  //   if(action.type === 'server/hello'){
  //     console.log('Got hello data!', action.data);
  //     client.emit('action', {type:'message', text:'good day!'});
  //   }
  // });
});


io.listen(3000);