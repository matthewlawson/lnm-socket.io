import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import chromeMiddleware from './chromeMiddleware';

// let socket = io('http://localhost:3000');
// let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

let chromeExtensionMiddleWare = chromeMiddleware('chrome');

let store = applyMiddleware(chromeExtensionMiddleWare)(createStore)(reducers);


export default store;