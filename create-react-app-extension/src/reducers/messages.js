import { actionTypes as types } from '../actionsTypes';

const initialMessages = ['hello'];

function messages(state = initialMessages, action) {
  switch (action.type) {
    case types.MESSAGE_TEXT_RECEIVED:
      let newState = state.slice();
      newState.push(action.message);
      return newState;
    case types.MESSAGE_FETCH_SUCCESS:
      return action.messages;
    default:
      return state;
  }
}

export default messages;