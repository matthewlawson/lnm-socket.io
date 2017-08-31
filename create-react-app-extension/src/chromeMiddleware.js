/**
* Middleware based on redux-socket, handles event eimtting between chrome extensions native 
* message capabilities.
* https://github.com/itaylor/redux-socket.io/blob/master/src/index.js
*/
export default function startChromeMessageListening(criteria = 'chrome/',
  { eventName = 'action', execute = defaultExecute } = {}) {
  const emitBound = sendMessageToBackgroundProcess;
  return ({ dispatch }) => {
    setupBackgroundServiceDispatcher(dispatch);
    return next => (action) => {
      if (evaluate(action, criteria)) {
        return execute(action, emitBound, next, dispatch);
      }
      return next(action);
    };
  };

  function evaluate(action, option) {
    if (!action || !action.type) {
      return false;
    }

    const { type } = action;
    let matched = false;
    if (typeof option === 'string') {
      // String prefix
      matched = type.indexOf(option) === 0;
    } 
    console.log(action, option, matched);
    return matched;
  }

  function defaultExecute(action, emit, next, dispatch) { // eslint-disable-line no-unused-vars
    console.log('executing', emit);
    emit(eventName, action);
    return next(action);
  }

  function sendMessageToBackgroundProcess(eventName, action) {
    console.log('do the chrome messaging ...', eventName, action);
  }
  
  //So it can be dev's in the browser a little easier
  function dummyChrome () {
    console.log('Running in browser mode');
    return {runtime: {
        onMessage: {
          addListener: () => {}
        }
      }};
    }
  
  function setupBackgroundServiceDispatcher(dispatch) {
    const chrome = chrome && chrome.extension ? chrome: dummyChrome(); // eslint-disable-line no-use-before-define
    
    chrome.runtime.onMessage.addListener( // eslint-disable-line no-undef
      function (request, sender, sendResponse) {
        console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
          "from the extension");
        if (request.type === "send_notifications") {
          sendResponse({ ping: 'pong' });
          console.log(request);
          //Dispatch to redx=ux the message from chrome background thread 
          dispatch(request);
        }
      }
    );
  }
}