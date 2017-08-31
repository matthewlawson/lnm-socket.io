import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// store.subscribe(()=>{
//   console.log('new client state', store.getState());
// });

store.dispatch({type:'server/hello', data:'Hello!'});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);