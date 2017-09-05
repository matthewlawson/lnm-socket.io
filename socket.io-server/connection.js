const server = require('http').createServer();
const io = require('socket.io')(server, {
  // Prioritise websocket first.
  transports: ['websocket', 'polling']
});


io.listen(3000);
module.exports = io;