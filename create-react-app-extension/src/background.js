import io from 'socket.io-client';
import { messageTypes, messagePayloads } from './actionsTypes';

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
    await sendToBrowserAction(packet);
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
    await sendToBrowserAction(packet);
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
    await sendToBrowserAction(packet);
  }
  catch (err) { }
});

function sendToBrowserAction(payload) {
  console.log("Sending to browserAction: ", payload);

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(payload, function (response) { //eslint-disable-line no-undef
      if (response) {
        resolve(response);
      }
      else {
        reject("browserAction not open");
      }
    });
  });
}

//Add listener fro message request ....
chrome.runtime.onMessage.addListener( //eslint-disable-line no-undef
  function (request, sender, sendResponse) {
    switch (request.type) {
      case messageTypes.FETCH_MESSAGES:
        sendResponse(messages);
        break;
      default:
        break;
    }
  }
);
// Send notiications


