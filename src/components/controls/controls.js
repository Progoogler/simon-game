import React, { Component } from 'react';
import './controls.css';

class Controls extends Component {
  constructor() {
    super();
    this.state = {
      startShadow: '2px 1px 1px 1px grey',
      strictShadow: '2px 1px 1px 1px grey',
    };
    this.normalShadow = '2px 1px 1px 1px grey';
    this.pressedShadow = '1px 0px 0px 0px grey';
  }

  render() {
    return (
      <div className={'controls-container'}>
        <div className={'start-button'} style={{boxShadow: this.state.startShadow}} onClick={this.props.startNewGame()}>
          <img src="./images/power-icon.png" alt="Power on/off symbol" />
        </div>
        <div className={'strict-button'} style={{boxShadow: this.state.strictShadow}} onClick={this.props.toggleStrictMode()}>
          <img src="./images/flame-icon.png" alt="Flame to signify difficulty" />
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.start !== this.props.start) {
      this.setState({startShadow: this.pressedShadow});
      setTimeout(() => this.setState({startShadow: this.normalShadow}), 250);
    }
    if (nextProps.strict !== this.props.strict) {
      this.setState({strictShadow: this.pressedShadow});
      setTimeout(() => this.setState({strictShadow: this.normalShadow}), 250);
    }
  }
}

export default Controls;
