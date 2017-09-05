const server = require('http').createServer();
const io = require('./connection');

const messageTypes = require('./messageTypes');

io.on('connection', (client) => {
  console.log('connection');
  io.emit(messageTypes.MESSAGE_TEXT, `${client.id} has joined the room`);
  // DEBUG...
  setInterval( () => {
    const payload = `hello ${client.id}`
    console.log(`sending payload: ${JSON.stringify(payload)}`);
    client.emit(messageTypes.MESSAGE_TEXT, payload);
  }, 10000);

  //Receive from client broadcast to everyone.
  client.on(messageTypes.SEND_MESSAGE, (action) => {
    io.emit(messageTypes.MESSAGE_TEXT, action.payload);
  });

  // client.on('action', (action) => {
  //   if(action.type === 'server/hello'){
  //     console.log('Got hello data!', action.data);
  //     client.emit('action', {type:'message', text:'good day!'});
  //   }
  // });
});

