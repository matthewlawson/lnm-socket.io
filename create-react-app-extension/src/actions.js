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

export const messageFetchedSuccess = messages => {
  return {
    type: types.MESSAGE_FETCH_SUCCESS,
    messages
  }
}

function dummyChrome() {
  console.log('Running in browser mode');
  return {
    runtime: {
      onMessage: {
        addListener: () => {}
      },
      sendMessage: () => {}
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

    setTimeout(() => {
      dispatch(messageFetchedSuccess(['hi', 'hello']));
    }, 3000);
  }
};

export const fetchMessages = (params) => async dispatch => {
  //Send message to chrome background task and get messages.

  chrome.runtime.sendMessage({type: messageTypes.FETCH_MESSAGES}, function (response) { //eslint-disable-line no-undef
    if(response) {
      dispatch(messageFetchedSuccess(response));
    }
  });  
}