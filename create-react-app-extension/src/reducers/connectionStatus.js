const initialState = 'connecting';

function connectionState(state = initialState, action) {
  let newState;

  switch (action.type) {
    case 'CONNECTION_CHANGED':
      newState = state;
      return newState;
    default:
      return state;
  }
}

export default connectionState;
