import { actionTypes as types } from '../actionsTypes';

const initialState = 'connecting';

function connectionState(state = initialState, action) {
  
  switch (action.type) {
    case types.CONNECTION_CHANGED:
      return action.connection;
    default:
      return state;
  }
}

export default connectionState;
