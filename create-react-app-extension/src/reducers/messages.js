import { actionTypes as types } from '../actionsTypes';

const initialState = {
  messages: ['hello'],
  composingMessage: ''
};

function messages(state = initialState, action) {
  switch (action.type) {
    case types.MESSAGE_TEXT_RECEIVED:
      let newMessages = state.messages.slice();
      newMessages.push(action.message);
      return { ...state, messages: newMessages };
    case types.MESSAGE_FETCH_SUCCESS:
      return { ...state, messages: action.messages }
    case types.MESSAGE_CHANGED:
      return { ...state, composingMessage: action.composingMessage }
    default:
      return state;
  }
}

export default messages;