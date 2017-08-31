const initialMessages = [{type:'message', text: 'hi'}];

function messages(state = initialMessages, action){
  switch(action.type){
    case 'message':
      console.log('messag in reducers ...', action, state);
      let newState = state.slice();
      newState.push(action);
      console.log(newState);
      return newState;
      //push to the array ...
      // return Object.assign({}, {message:action.data});
      // return state;
    default:
      return state;
  }
}

export default messages;