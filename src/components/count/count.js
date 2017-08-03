import React, { Component } from 'react';
import './count.css';


class Count extends Component {
  constructor() {
    super();
    this.state = {
      boxShadow: 'inset 0 0 4px white',
    }
  }

  render() {
    return (
      <div className={'container'} style={{boxShadow: this.state.boxShadow}}>
        <div className={'count'}>{ this.props.count }</div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.strict !== this.props.strict) {
      if (nextProps.strict === true) {
        this.setState({boxShadow: 'inset 0 0 10px #e04006'});
      } else {
        this.setState({boxShadow: 'inset 0 0 4px white'});
      }
    }
  }
}

export default Count;
