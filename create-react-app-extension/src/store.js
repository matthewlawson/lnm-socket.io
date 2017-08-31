import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reducers from './reducers';

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");


let store = applyMiddleware(socketIoMiddleware)(createStore)(reducers);


export default store;