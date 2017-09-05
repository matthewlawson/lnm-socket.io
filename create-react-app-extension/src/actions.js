/* eslint-disable */
import { actionTypes as types, messageTypes } from './actionsTypes';
import sendChromeMessage from './sendChromeMessage';

const isChromeExtentsion = window.chrome && chrome && chrome.runtime && chrome.runtime.id;

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

const sendMessagePending = () => {
  return {
    type: types.SEND_MESSAGE_PENDING,
  }
}

const sendMessageSuccess = () => {
  return {
    type: types.SEND_MESSAGE_SUCCESS,
  }
}

const sendMessageFailure = () => {
  return {
    type: types.SEND_MESSAGE_FAILURE,
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
export const updateComposingMessage = (composingMessage) => {
  return {
    type: types.MESSAGE_CHANGED,
    composingMessage
  }
};

// export const messageChanged = event => dispatch => {
//   console.log(event.target.value);
//   // Could dispatch typing notifications etc..
//   dispatch(updateComposingMessage(event.target.value));
// }

export const sendMessage = message => async dispatch => {
  dispatch(sendMessagePending());
  
  try {
    const backgroundResponse = await sendChromeMessage(message);
    dispatch(sendMessageSuccess());
  }
  catch(err) {
    dispatch(sendMessageFailure());
  }
}
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