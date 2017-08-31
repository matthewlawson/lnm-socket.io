
import React from 'react';
import PropTypes from 'prop-types';

const ChatBubble = ({ text }) => (
  <li className="message left appeared">
  <div className="avatar"></div>
  <div className="text_wrapper">
    <div className="text">{text}</div>
  </div>
</li>
);

ChatBubble.PropTypes = {
  text: PropTypes.string.isRequired
}

export default ChatBubble;