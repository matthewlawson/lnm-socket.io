import { actionTypes as types, messageTypes } from '../actionsTypes';

const initialMessages = ['hello'];

function messages(state = initialMessages, action) {
  switch (action.type) {
    case types.BACKGROUND_SCRIPT:
      // Multiple reducers look for BACKGROUND_SCRIPT. Check for subtype.
      if(action.message.type === messageTypes.MESSAGE_TEXT) {
        let newState = state.slice();
        newState.push(action.message.payload);
        return newState;
      }
      return state;
    default:
      return state;
  }
}

export default messages;