/* eslint-disable */
import { actionTypes as types, messageTypes } from './actionsTypes';

export const backgroundProcessMessage = message => {
  return {
    type: types.BACKGROUND_SCRIPT,
    message
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
      console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
      sendResponse({ ping: 'pong' });

      dispatch(backgroundProcessMessage(request));
    }
  );

  // setInterval(() => {
  //   dispatch(backgroundProcessMessage({type: messageTypes.MESSAGE_TEXT, payload: 'async'}));
  // }, 1000);
};