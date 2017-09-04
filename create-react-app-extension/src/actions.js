/* eslint-disable */
import { actionTypes as types, messageTypes } from './actionsTypes';

export const textMessageReceived = message => {
  return {
    type: types.MESSAGE_TEXT_RECEIVED,
    message
  }
}

export const connectionChanged = connection => {
  return {
    type: types.CONNECTION_CHANGED,
    connection
  }
}

function dummyChrome() {
  console.log('Running in browser mode');
  return {
    runtime: {
      onMessage: {
        addListener: () => { }
      }
    }
  };
}

const isChromeExtentsion = window.chrome && chrome && chrome.runtime && chrome.runtime.id;
export const initialiseMessageProcessing = params => async dispatch => {

  if (!isChromeExtentsion) {
    window.chrome = dummyChrome();
  }

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      switch (request.type) {
        case messageTypes.CONNECTION_CHANGE:
          dispatch(connectionChanged(request.payload));
          break;
        case messageTypes.MESSAGE_TEXT:
          dispatch(textMessageReceived(request.payload));
          break;
        default:
          break;
      }
      sendResponse({ ping: 'pong' });
    }
  );

  //DEBUG CODE
  if (!isChromeExtentsion) {
    setInterval(() => {
      dispatch(textMessageReceived( 'ASYNC-NEW FORMAT' ));
    }, 5000);

    setTimeout(() => {
      dispatch(connectionChanged('connected'));
    }, 3000);
  }
};