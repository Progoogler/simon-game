import React, { Component } from 'react';
import './controls.css';

class Controls extends Component {
  render() {
    return (
      <div className={'controls-container'}>
        <div className={'start-button'} onClick={this.props.startNewGame()}>
          <img src="./images/power-icon.png" alt="Power on/off symbol" />
        </div>
        <div className={'strict-button'}>
          <img src="./images/flame-icon.png" alt="Flame to signify difficulty" />
        </div>
      </div>
    );
  }
}

export default Controls;
