import React from 'react';
import PropTypes from 'prop-types';
import ChatBubble from '../ChatBubble';

import './Chat.css'
const ChatWindow = ({connectionStatus, messages}) => {
  const chatBubbles = messages.map((i, message) => {
    return <ChatBubble text={message.text} key={i} />
  });

  const connectingClass = () => {
    return `button ${connectionStatus}`;
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
        <div className="message_input_wrapper"><input className="message_input" placeholder="Type your message here..." /></div>
        <div className="send_message">
          <div className="icon"></div>
          <div className="text">Send</div>
        </div>
      </div>
    </div>
    
  </div>
};

ChatWindow.propTypes = {
  connectionStatus: PropTypes.string,
  messages: PropTypes.array
}
export default ChatWindow;