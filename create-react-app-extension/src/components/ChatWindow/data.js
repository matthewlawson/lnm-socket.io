import { connect } from 'react-redux';
import Chat from './';

const mapStateToProps = state => {
  const newProps = {
    messages: state.messages,
    connectionStatus: state.connectionStatus
  };
  return newProps;
};

const mapDispatchToProps = dispatch => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

