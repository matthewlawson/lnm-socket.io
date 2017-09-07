// index.js
const { global } = require('./constants');
const debug = require('debug')(`${global.APP_NAME}:index`);
const monitorJoinLeaves = require('./monitorJoinLeaves')();
const monitorMessageSending = require('./monitorMessageSending')();
