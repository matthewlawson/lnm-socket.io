import { actionTypes as types, messageTypes } from '../actionsTypes';

const initialState = 'connecting';

function connectionState(state = initialState, action) {
  
  switch (action.type) {
    case types.BACKGROUND_SCRIPT:
      if(action.message.type === messageTypes.CONNECTION_CHANGE) {
        return action.message.payload;
      }
      return state;
    default:
      return state;
  }
}

export default connectionState;
