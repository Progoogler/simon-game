import React, { Component } from 'react';
import './App.css';
import Title from './components/title/title';
import Count from './components/count/count';
import Controls from './components/controls/controls';
import Square from './components/square/square';
// import Corner from './components/corner/corner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: '00',
    }
    this.memory = [];
  }

  render() {
    return (
      <div className={'App'}>
        <Title />
        <Count count={this.state.count} />
        <Square updateCount={this.updateCount.bind(this)} />
        <Controls startNewGame={this.startNewGame.bind(this)} />
      </div>
    );
  }

  startNewGame() {
    this.memory = [];
    this.pickNewColor(Math.floor(Math.random() * 3));
  }

  updateCount(count) {
    if (count < 10) {
      this.setState({count: '0' + count});
    } else {
      this.setState({count: '' + count});
    }
  }
}



export default App;
