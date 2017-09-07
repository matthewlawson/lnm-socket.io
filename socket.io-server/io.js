// io.js
const { global } = require('./constants');
const debug = require('debug')(`${global.APP_NAME}:io`);
const server = require('http').createServer();

const io = require('socket.io')(server, {
  // Prioritise websocket first.
  transports: ['websocket', 'polling']
});

debug('Start socket.io listening');
io.listen(3000);
module.exports = io;