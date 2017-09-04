import { actionTypes as types } from '../actionsTypes';

const initialMessages = ['hello'];

function messages(state = initialMessages, action) {
  switch (action.type) {
    case types.MESSAGE_TEXT_RECEIVED:
      let newState = state.slice();
      newState.push(action.message);
      return newState;
    default:
      return state;
  }
}

export default messages;