import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialiseMessageProcessing } from '../../actions';
import './App.css';
import ChatWindow from '../ChatWindow/data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatWindow />
      </div>
    );
  }

  componentDidMount() {
    this.props.initialiseMessageProcessing();
  }
}

App.propTypes = {
  initialiseMessageProcessing: PropTypes.func.isRequired,
}


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      initialiseMessageProcessing,
    },
    dispatch,
  );

export default connect(() => ({}), mapDispatchToProps)(App);
