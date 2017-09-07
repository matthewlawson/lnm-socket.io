// background.js
import io from 'socket.io-client';
import { messageTypes, messagePayloads } from '../actionsTypes';
import sendChromeMessage from '../sendChromeMessage';

const socket = io('http://localhost:3000');

let messages = [];
let connectionStatus = messagePayloads.CONNECTING;

socket.on('connect', async () => {
  connectionStatus = messagePayloads.CONNECTED;
  const packet = {
    type: messageTypes.CONNECTION_CHANGE,
    payload: connectionStatus,
  }
  try {
    await sendChromeMessage(packet);
  }
  catch (err) { }
});

// Make generic for handling all messagess from node.
socket.on(messageTypes.MESSAGE_TEXT, async (payload) => {
  messages.push(payload);
  const packet = {
    type: messageTypes.MESSAGE_TEXT,
    payload: payload
  }
  try {
    await sendChromeMessage(packet);
  }
  catch (err) { }

});

socket.on('disconnect', async () => {
  connectionStatus = messagePayloads.DISCONNECTED;
  const packet = {
    type: messageTypes.CONNECTION_CHANGE,
    payload: connectionStatus,
  }
  try {
    await sendChromeMessage(packet);
  }
  catch (err) { }
});

function sendMessageFromClient(message) {
  socket.emit(messageTypes.SEND_MESSAGE, message);
}

//Add listener fro message request ....
chrome.runtime.onMessage.addListener( //eslint-disable-line no-undef
  (request, sender, sendResponse) => {
    console.log(request);
    switch (request.type) {
      case messageTypes.FETCH_MESSAGES:
        sendResponse(messages);
        break;
      case messageTypes.SEND_MESSAGE:
        sendMessageFromClient(request.message);
        break;
      default:
        break;
    }
  }
);
// Send notiications


