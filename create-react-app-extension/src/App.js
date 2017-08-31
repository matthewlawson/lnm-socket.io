import React, { Component } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow/data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatWindow />
      </div>
    );
  }
}

export default App;
