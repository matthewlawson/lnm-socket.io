import { combineReducers } from 'redux';
import connectionStatus from './connectionStatus';
import messages from './messages';

export default combineReducers({
  connectionStatus, 
  messages, 
});