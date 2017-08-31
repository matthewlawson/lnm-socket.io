import { connect } from 'react-redux';
import Chat from './';

const mapStateToProps = state => {
  const newProps = {
    messages: state.messages,
    connectionStatus: state.connectionStatus
  };
  console.log(newProps);
  return newProps;
};

const mapDispatchToProps = dispatch => ({
  
});

const ChatData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatData;
