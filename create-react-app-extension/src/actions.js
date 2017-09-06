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

export const sendMessage = message => async dispatch => {
  dispatch(sendMessagePending());
  
  try {
    const backgroundResponse = await sendChromeMessage(sendComposedMessageToBackground(message));
    dispatch(sendMessageSuccess());
  }
  catch(err) {
    dispatch(sendMessageFailure());
  }
}

//Split actions into redux actions and actions to send to background
const sendComposedMessageToBackground = (message) => {
  return {
    type: messageTypes.SEND_MESSAGE,
    message
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

const fetchMessageAction = () => {
  return {
    type: messageTypes.FETCH_MESSAGES
  }
}

export const fetchMessages = (params) => async dispatch => {
  //Send message to chrome background task and get messages.
  chrome.runtime.sendMessage(fetchMessageAction(), function (response) { //eslint-disable-line no-undef
    if(response) {
      dispatch(messageFetchedSuccess(response));
    }
  });  
}