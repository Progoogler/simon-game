import React, { Component } from 'react';
import './count.css';

class Count extends Component {
  render() {
    return (
      <div className={'container'}>
        <div className={'count'}>{ this.props.count }</div>
      </div>
    );
  }
}

export default Count;
