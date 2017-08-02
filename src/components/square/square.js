import React, { Component } from 'react';
import Corner from '../corner/corner';
import './square.css';

class Square extends Component {
  constructor() {
    super();
    this.state = {
      0: '#ff4d4d',
      1: '#00b300',
      2: '#3333ff',
      3: '#ffff66',
    };
    this.memory = [];
    this.showingPattern = false;
    this.inactiveRed = '#ff4d4d';
    this.inactiveGreen = '#00b300';
    this.inactiveBlue = '#3333ff';
    this.inactiveYellow = '#ffff66';
    this.activeRed = '#e60000';
    this.activeGreen = '#006600';
    this.activeBlue = '#0000e6';
    this.activeYellow = '#ffff00';
  }

  render() {
    return (
      <div className={'square'}>
        <Corner color={this.state[0]} degree={.37} place={'top'} top={'-19px'} left={'-58px'} activateColor={() => this.handleRedCorner.bind(this)} />
        <Corner color={this.state[1]} degree={.875} place={'bottom'} top={'127px'} left={'167px'} activateColor={() => this.handleGreenCorner.bind(this)} />
        <Corner color={this.state[2]} degree={.63} place={'left'} bottom={'167px'} left={'169px'} activateColor={() => this.handleBlueCorner.bind(this)} />
        <Corner color={this.state[3]} degree={.125} place={'right'} bottom={'20px'} left={'-56px'} activateColor={() => this.handleYellowCorner.bind(this)} />
      </div>
    );
  }

  startNewGame() {
    this.memory = [];
    this.pickNewColor(Math.floor(Math.random() * 3));
  }

  pickNewColor(number) { // 0: red, 1: green, 2: blue, 3: yellow
    // if (this.memory[this.memory.length - 1] === number) {
    //   var newNumber = Math.floor(Math.random() * 3);
    //   while (newNumber === number) {
    //     newNumber = Math.floor(Math.random() * 3);
    //   }
    // }
    // newNumber ? this.memory.push(newNumber) : this.memory.push(number);
    this.memory.push(number);
    this.props.updateCount(this.memory.length);
    this.showPattern();
  }

  showPattern() {
    this.showingPattern = true;
    setTimeout(() => {
      this.showingPattern = false;
    }, this.memory.length * 750);
    var timeout = 0;
    var fadeColor = 0;
    for (let i = 0; i < this.memory.length; i++) {
      setTimeout(() => {
        switch (this.memory[i]) {
          case 0:
            this.setState({0: this.activeRed});
            setTimeout(() => {
              this.setState({0: this.inactiveRed});
            }, fadeColor += 750);
            break;
          case 1:
            this.setState({1: this.activeGreen});
            setTimeout(() => {
              this.setState({0: this.inactiveGreen});
            }, fadeColor += 750);
            break;
          case 2:
            this.setState({2: this.activeBlue});
            setTimeout(() => {
              this.setState({0: this.inactiveBlue});
            }, fadeColor += 750);
            break;
          case 3:
            this.setState({3: this.activeYellow});
            setTimeout(() => {
              this.setState({0: this.inactiveYellow});
            }, fadeColor += 750);
            break;
          default:
            break;
        }
      }, timeout += 500);
    }
  }

  handleRedCorner() {
    if (this.showingPattern === true) return;
    this.setState({0: this.activeRed});
    setTimeout(() => this.setState({0: this.inactiveRed}), 250);
  }

  handleGreenCorner() {
    if (this.showingPattern === true) return;
    this.setState({1: this.activeGreen});
    setTimeout(() => this.setState({1: this.inactiveGreen}), 250);
  }

  handleBlueCorner() {
    if (this.showingPattern === true) return;
    this.setState({2: this.activeBlue});
    setTimeout(() => this.setState({2: this.inactiveBlue}), 250);
  }

  handleYellowCorner() {
    if (this.showingPattern === true) return;
    this.setState({3: this.activeYellow});
    setTimeout(() => this.setState({3: this.inactiveYellow}), 250);
  }

}

export default Square;
