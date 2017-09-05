import React, { Component }  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChatBubble from '../ChatBubble';
import { fetchMessages, sendMessage, updateComposingMessage } from '../../actions';
import { bindActionCreators } from 'redux';

import './Chat.css'

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    this.state = {messageInput: ''};
  }
  render() {
    const chatBubbles = this.props.messages.map( ( message, i) => {
      return <ChatBubble text={message} key={i} />
    });
  
    const connectingClass = () => {
      return `button ${this.props.connectionStatus}`;
    }
    return <div>
      <div className="chat_window">
        <div className="top_menu">
          <div className="buttons">
            <div className={connectingClass()}></div>
          </div>
          <div className="title">Chat</div>
        </div>
        <ul className="messages">
          {chatBubbles}
        </ul>
        <div className="bottom_wrapper clearfix">
          <div className="message_input_wrapper">
            <input className="message_input" placeholder="Type your message here..." value={this.props.composingMessage} onChange={(e) => this.props.updateComposingMessage(e.target.value)}/>
          </div>
          <div className="send_message" onClick={this.sendMessage}>
            <div className="icon"></div>
            <div className="text">Send</div>
          </div>
        </div>
      </div>
      
    </div>
  }

  componentDidMount() {
    // Fetch messages when chrome window opens
    this.props.fetchMessages();
  }
 
  sendMessage() {
    console.log('sendmessage', this.props.composingMessage);
    this.props.sendMessage(this.props.composingMessage);
  }
}

ChatWindow.propTypes = {
  connectionStatus: PropTypes.string,
  messages: PropTypes.array
}

const mapStateToProps = state => {
  const newProps = {
    messages: state.messages.messages,
    connectionStatus: state.connectionStatus,
    composingMessage: state.messages.composingMessage
  };
  return newProps;
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchMessages,
    sendMessage,
    updateComposingMessage
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatWindow);
