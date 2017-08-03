import React, { Component } from 'react';
import './App.css';
import Title from './components/title/title';
import Count from './components/count/count';
import Controls from './components/controls/controls';
import Corner from './components/corner/corner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: '00',
      strict: false,
      startButton: 0,
      strictButton: 0,
      0: '#ff4d4d',
      1: '#00b300',
      2: '#3333ff',
      3: '#ffff66',
      border: '10px solid grey',
      boxShadow: 'inset 0 0 20px black',
    };
    this.memory = [];
    this.attempt = [];
    this.strict = false;
    this.showingPattern = false;
    this.celebrating = false;
    this.notify = undefined;
    this.errorBorder = '10px solid red';
    this.successBorder = '10px solid green';
    this.normalBorder = '10px solid grey';
    this.normalShadow = 'inset 0 0 20px black';
    this.redShadow = '0px 0px 50px #e60000, inset 0 0 20px #e60000';
    this.greenShadow = '0px 0px 50px #006600, inset 0 0 20px #006600';
    this.blueShadow = '0px 0px 50px #0000e6, inset 0 0 20px #0000e6';
    this.yellowShadow = '0px 0px 50px #ffff00, inset 0 0 20px #ffff00'
    this.inactiveRed = '#ff4d4d';
    this.inactiveGreen = '#00b300';
    this.inactiveBlue = '#3333ff';
    this.inactiveYellow = '#ffff66';
    this.activeRed = '#e60000';
    this.activeGreen = '#006600';
    this.activeBlue = '#0000e6';
    this.activeYellow = '#ffff00';
    this.redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    this.greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    this.blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    this.yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    this.errorSound = new Audio('./sounds/Computer-Error-Alert.mp3');
    this.winSound = new Audio('./sounds/Crowd-Applause.mp3');
  }

  render() {
    return (
      <div className={'App'}>
        <Title />
        <Count strict={this.state.strict} count={this.state.count} />
        <div className={'Square'} style={{border: this.state.border, boxShadow: this.state.boxShadow}}>
          <Corner color={this.state[0]} degree={.37} place={'top'} top={'-19px'} left={'-58px'} activateColor={() => this.handleRedCorner.bind(this)} />
          <Corner color={this.state[1]} degree={.875} place={'bottom'} top={'127px'} left={'167px'} activateColor={() => this.handleGreenCorner.bind(this)} />
          <Corner color={this.state[2]} degree={.63} place={'left'} bottom={'167px'} left={'169px'} activateColor={() => this.handleBlueCorner.bind(this)} />
          <Corner color={this.state[3]} degree={.125} place={'right'} bottom={'20px'} left={'-56px'} activateColor={() => this.handleYellowCorner.bind(this)} />
        </div>
        <Controls start={this.state.startButton} strict={this.state.strictButton} startNewGame={() => this.startNewGame.bind(this)} enableStrictMode={() => this.enableStrictMode.bind(this)} />
      </div>
    );
  }

  pickNewColor(number) { // 0: red, 1: green, 2: blue, 3: yellow
    this.memory.push(number);
    this.updateCount(this.memory.length);
    this.showPattern();
  }

  notification() {
    this.errorSound.play();
    this.displayErrorSignal();
    this.showPattern();
  }

  showPattern() {
    this.showingPattern = true;
    setTimeout(() => {
      this.showingPattern = false;
    }, this.memory.length * 750);
    this.notify = setTimeout(() => {
      this.notification();
    }, this.memory.length * 750 + 15000);
    var timeout = 0;
    for (let i = 0; i < this.memory.length; i++) {
      setTimeout(() => {
        switch (this.memory[i]) {
          case 0:
            if (i === 0) {
              this.setState({
                0: this.activeRed,
                1: 'white',
                2: 'white',
                3: 'white',
                boxShadow: this.redShadow,
              });
            } else {
              this.setState({
                0: this.activeRed,
                boxShadow: this.redShadow,
              });
            }
            if (i === this.memory.length - 1) {
              setTimeout(() => {
                this.setState({
                  0: this.inactiveRed,
                  1: this.inactiveGreen,
                  2: this.inactiveBlue,
                  3: this.inactiveYellow,
                  boxShadow: this.normalShadow
                });
              }, 750);
            } else {
              setTimeout(() => {
                this.setState({
                  0: 'white',
                  boxShadow: this.normalShadow
                });
              }, 750);
            }
            break;
          case 1:
            if (i === 0) {
              this.setState({
                0: 'white',
                1: this.activeGreen,
                2: 'white',
                3: 'white',
                boxShadow: this.greenShadow,
              });
            } else {
              this.setState({
                1: this.activeGreen,
                boxShadow: this.greenShadow,
              });
            }
            if (i === this.memory.length - 1) {
              setTimeout(() => {
                this.setState({
                  0: this.inactiveRed,
                  1: this.inactiveGreen,
                  2: this.inactiveBlue,
                  3: this.inactiveYellow,
                  boxShadow: this.normalShadow
                });
              }, 750);
            } else {
              setTimeout(() => {
                this.setState({
                  1: 'white',
                  boxShadow: this.normalShadow
                });
              }, 750);
            }
            break;
          case 2:
            if (i === 0) {
              this.setState({
                0: 'white',
                1: 'white',
                2: this.activeBlue,
                3: 'white',
                boxShadow: this.blueShadow,
              });
            } else {
              this.setState({
                2: this.activeBlue,
                boxShadow: this.blueShadow,
              });
            }
            if (i === this.memory.length - 1) {
              setTimeout(() => {
                this.setState({
                  0: this.inactiveRed,
                  1: this.inactiveGreen,
                  2: this.inactiveBlue,
                  3: this.inactiveYellow,
                  boxShadow: this.normalShadow
                });
              }, 750);
            } else {
              setTimeout(() => {
                this.setState({
                  2: 'white',
                  boxShadow: this.normalShadow
                });
              }, 750);
            }
            break;
          case 3:
            if (i === 0) {
              this.setState({
                0: 'white',
                1: 'white',
                2: 'white',
                3: this.activeYellow,
                boxShadow: this.yellowShadow,
              });
            } else {
              this.setState({
                3: this.activeYellow,
                boxShadow: this.yellowShadow,
              });
            }
            if (i === this.memory.length - 1) {
              setTimeout(() => {
                this.setState({
                  0: this.inactiveRed,
                  1: this.inactiveGreen,
                  2: this.inactiveBlue,
                  3: this.inactiveYellow,
                  boxShadow: this.normalShadow
                });
              }, 750);
            } else {
              setTimeout(() => {
                this.setState({
                  3: 'white',
                  boxShadow: this.normalShadow
                });
              }, 750);
            }
            break;
          default:
            break;
        }
      }, timeout += 1000);
    }
  }

  handleRedCorner() {
    this.redSound.play();
    if (this.showingPattern || this.celebrating) return;
    clearTimeout(this.notify);
    this.notify = setTimeout(() => this.notification, 15000);
    this.setState({0: this.activeRed});
    setTimeout(() => this.setState({0: this.inactiveRed}), 250);
    if (this.memory.length) {
      if (this.attempt.length < this.memory.length) {
        if (this.memory[this.attempt.length] === 0) {
          this.attempt.push(0);
          if (this.attempt.length === this.memory.length && this.memory.length < 20) {
            this.attempt = [];
            this.displaySuccessSignal();
            setTimeout(() => this.pickNewColor(Math.floor(Math.random() * 3)), 1000);
          } else if (this.attempt.length === 20) {
            this.displayWinSignal();
          }
        } else {
          if (this.state.strict) {
            this.errorSound.play();
            this.displayErrorSignal('strict');
            setTimeout(() => this.startNewGame(), 1500);
          } else {
            this.errorSound.play();
            this.displayErrorSignal();
            this.attempt = [];
            this.showPattern();
          }
        }
      }
    }
  }

  handleGreenCorner() {
    this.greenSound.play();
    if (this.showingPattern || this.celebrating) return;
    clearTimeout(this.notify);
    this.notify = setTimeout(() => this.notification, 15000);
    this.setState({1: this.activeGreen});
    setTimeout(() => this.setState({1: this.inactiveGreen}), 250);
    if (this.memory.length) {
      if (this.attempt.length < this.memory.length) {
        if (this.memory[this.attempt.length] === 1) {
          this.attempt.push(1);
          if (this.attempt.length === this.memory.length && this.memory.length < 20) {
            this.attempt = [];
            this.displaySuccessSignal();
            setTimeout(() => this.pickNewColor(Math.floor(Math.random() * 3)), 1000);
          } else if (this.attempt.length === 20) {
            this.displayWinSignal();
          }
        } else {
          if (this.state.strict) {
            this.errorSound.play();
            this.displayErrorSignal('strict');
            setTimeout(() => this.startNewGame(), 1500);
          } else {
            this.errorSound.play();
            this.displayErrorSignal();
            this.attempt = [];
            this.showPattern();
          }
        }
      }
    }
  }

  handleBlueCorner() {
    this.blueSound.play();
    if (this.showingPattern || this.celebrating) return;
    clearTimeout(this.notify);
    this.notify = setTimeout(() => this.notification, 15000);
    this.setState({2: this.activeBlue});
    setTimeout(() => this.setState({2: this.inactiveBlue}), 250);
    if (this.memory.length) {
      if (this.attempt.length < this.memory.length) {
        if (this.memory[this.attempt.length] === 2) {
          this.attempt.push(2);
          if (this.attempt.length === this.memory.length && this.memory.length < 20) {
            this.attempt = [];
            this.displaySuccessSignal();
            setTimeout(() => this.pickNewColor(Math.floor(Math.random() * 3)), 1000);
          } else if (this.attempt.length === 20) {
            this.displayWinSignal();
          }
        } else {
          if (this.state.strict) {
            this.errorSound.play();
            this.displayErrorSignal('strict');
            setTimeout(() => this.startNewGame(), 1500);
          } else {
            this.errorSound.play();
            this.displayErrorSignal();
            this.attempt = [];
            this.showPattern();
          }
        }
      }
    }
  }

  handleYellowCorner() {
    this.yellowSound.play();
    if (this.showingPattern || this.celebrating) return;
    clearTimeout(this.notify);
    this.notify = setTimeout(() => this.notification, 15000);
    this.setState({3: this.activeYellow});
    setTimeout(() => this.setState({3: this.inactiveYellow}), 250);
    if (this.memory.length) {
      if (this.attempt.length < this.memory.length) {
        if (this.memory[this.attempt.length] === 3) {
          this.attempt.push(3);
          if (this.attempt.length === this.memory.length && this.memory.length < 20) {
            this.attempt = [];
            this.displaySuccessSignal();
            setTimeout(() => this.pickNewColor(Math.floor(Math.random() * 3)), 1000);
          } else if (this.attempt.length === 20) {
            this.displayWinSignal();
          }
        } else {
          if (this.state.strict) {
            this.errorSound.play();
            this.displayErrorSignal('strict');
            setTimeout(() => this.startNewGame(), 1500);
          } else {
            this.errorSound.play();
            this.displayErrorSignal();
            this.attempt = [];
            this.showPattern();
          }
        }
      }
    }
  }

  updateCount(count) {
    if (count < 10) {
      this.setState({count: '0' + count});
    } else {
      this.setState({count: '' + count});
    }
  }

  startNewGame() {
    this.memory = [];
    this.attempt = [];
    this.setState({startButton: this.state.startButton + 1});
    this.pickNewColor(Math.floor(Math.random() * 3));
  }

  enableStrictMode() {
    this.setState({strict: !this.state.strict, strictButton: this.state.strictButton + 1});
  }

  displaySuccessSignal() {
    this.setState({border: this.successBorder});
    setTimeout(() => {
      this.setState({border: this.normalBorder});
    }, 750);
  }

  displayWinSignal() {
    this.winSound.play();
    this.celebrating = true;
    this.setState({boxShadow: this.redShadow});
    setTimeout(() => this.setState({boxShadow: this.greenShadow}), 250);
    setTimeout(() => this.setState({boxShadow: this.blueShadow}), 500);
    setTimeout(() => this.setState({boxShadow: this.yellowShadow}), 750);
    setTimeout(() => this.setState({boxShadow: this.redShadow}), 1000);
    setTimeout(() => this.setState({boxShadow: this.greenShadow}), 1250);
    setTimeout(() => this.setState({boxShadow: this.blueShadow}), 1500);
    setTimeout(() => this.setState({boxShadow: this.yellowShadow}), 1750);
    setTimeout(() => this.setState({boxShadow: this.redShadow}), 2000);
    setTimeout(() => this.setState({boxShadow: this.greenShadow}), 2250);
    setTimeout(() => this.setState({boxShadow: this.blueShadow}), 2500);
    setTimeout(() => this.setState({boxShadow: this.yellowShadow}), 2750);
    setTimeout(() => this.setState({boxShadow: this.redShadow}), 3000);
    setTimeout(() => this.setState({boxShadow: this.greenShadow}), 3250);
    setTimeout(() => this.setState({boxShadow: this.blueShadow}), 3500);
    setTimeout(() => this.setState({boxShadow: this.yellowShadow}), 3750);
    setTimeout(() => this.setState({boxShadow: this.redShadow}), 4000);
    setTimeout(() => this.setState({boxShadow: this.greenShadow}), 4250);
    setTimeout(() => this.setState({boxShadow: this.blueShadow}), 4500);
    setTimeout(() => this.setState({boxShadow: this.yellowShadow}), 4750);
    setTimeout(() => this.setState({boxShadow: this.redShadow}), 5000);
    setTimeout(() => this.setState({boxShadow: this.greenShadow}), 5250);
    setTimeout(() => this.setState({boxShadow: this.blueShadow}), 5500);
    setTimeout(() => this.setState({boxShadow: this.yellowShadow}), 5750);
    setTimeout(() => this.setState({boxShadow: '0px 0px 50px #e04006, inset 0 0 20px #e04006'}), 6000);
    setTimeout(() => {
      this.celebrating = false;
      this.setState({boxShadow: this.normalShadow, count: '00'});
    }, 10000);
  }

  displayErrorSignal(strict) {
    if (strict) {
      this.setState({border: this.errorBorder});
      setTimeout(() => {
        this.setState({border: this.normalBorder});
        setTimeout(() => {
          this.setState({border: this.errorBorder});
          setTimeout(() => {
            this.setState({border: this.normalBorder});
          }, 250);
        }, 250);
      }, 250);
    } else {
      this.setState({border: this.errorBorder});
      setTimeout(() => {
        this.setState({border: this.normalBorder});
      }, 750);
    }
  }

}



export default App;
