import React, { Component } from 'react';
import './corner.css';

class Corner extends Component {

  render() {
    var rotate;
    switch (this.props.place) {
      case 'top':
        rotate = 'rotate(' + this.props.degree + 'turn)';
        break;
      case 'bottom':
        rotate = 'rotate(' + this.props.degree + 'turn)';
        break;
      case 'left':
        rotate = 'rotate(' + this.props.degree +'turn)';
        break;
      case 'right':
        rotate = 'rotate(' + this.props.degree +'turn)';
        break;
      default:
        break;
    }

    const shape = {
      width: 0,
      height: 0,
      transform: rotate,
      borderLeft: '70px solid transparent',
      borderRight: '70px solid transparent',
      borderTop: '70px solid ' + this.props.color,
      borderRadius: '50%',
      position: 'relative',
      display: 'inline-block',
      top: this.props.top,
      bottom: this.props.bottom,
      right: this.props.right,
      left: this.props.left,
    };

    return (
      <div style={shape} className={'shape'} onClick={this.props.activateColor()} />
    );
  }
}

export default Corner;
