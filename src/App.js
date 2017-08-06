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
    this.goal = 20;
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
    this.secretCelebration = 0;
  }

  render() {
    return (
      <div className={'App'}>
        <Title />
        <div className={'Square'} style={{border: this.state.border, boxShadow: this.state.boxShadow}}>
          <Corner color={this.state[0]} degree={.37} place={'top'} top={'-20px'} left={'-58px'} activateColor={() => this.handleRedCorner.bind(this)} />
          <Corner color={this.state[1]} degree={.875} place={'bottom'} top={'127px'} left={'167px'} activateColor={() => this.handleGreenCorner.bind(this)} />
          <Corner color={this.state[2]} degree={.626} place={'left'} bottom={'167.6px'} left={'169px'} activateColor={() => this.handleBlueCorner.bind(this)} />
          <Corner color={this.state[3]} degree={.125} place={'right'} bottom={'20px'} left={'-56px'} activateColor={() => this.handleYellowCorner.bind(this)} />
        </div>
        <Count strict={this.state.strict} count={this.state.count} handleClick={() => this.setGoal.bind(this)}/>
        <Controls start={this.state.startButton} strict={this.state.strictButton} startNewGame={() => this.startNewGame.bind(this)} toggleStrictMode={() => this.toggleStrictMode.bind(this)} />
      </div>
    );
  }

  componentWillMount() {
    for (let i = 0; i < 2; i++) {
      document.getElementsByClassName('main')[i].style.height = '100%';
      document.getElementsByClassName('main')[i].style.width = '100%';
      document.getElementsByClassName('main')[i].style.boxShadow = 'inset 0 0 100px black';
    }
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
    clearTimeout(this.notify);
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
          if (this.attempt.length === this.memory.length && this.memory.length < this.goal) {
            this.attempt = [];
            this.displaySuccessSignal();
            setTimeout(() => this.pickNewColor(Math.floor(Math.random() * 3)), 1000);
          } else if (this.attempt.length === this.goal) {
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
    if (this.state.count === '00' && this.secretCelebration === 3) {
      this.displayWinSignal();
      this.secretCelebration = 0;
    } else {
      this.secretCelebration++;
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
          if (this.attempt.length === this.memory.length && this.memory.length < this.goal) {
            this.attempt = [];
            this.displaySuccessSignal();
            setTimeout(() => this.pickNewColor(Math.floor(Math.random() * 3)), 1000);
          } else if (this.attempt.length === this.goal) {
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
    if (this.state.count === '00' && this.secretCelebration === 3) {
      this.displayWinSignal();
      this.secretCelebration = 0;
    } else {
      this.secretCelebration++;
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
          if (this.attempt.length === this.memory.length && this.memory.length < this.goal) {
            this.attempt = [];
            this.displaySuccessSignal();
            setTimeout(() => this.pickNewColor(Math.floor(Math.random() * 3)), 1000);
          } else if (this.attempt.length === this.goal) {
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
    if (this.state.count === '00' && this.secretCelebration === 3) {
      this.displayWinSignal();
      this.secretCelebration = 0;
    } else {
      this.secretCelebration++;
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
          if (this.attempt.length === this.memory.length && this.memory.length < this.goal) {
            this.attempt = [];
            this.displaySuccessSignal();
            setTimeout(() => this.pickNewColor(Math.floor(Math.random() * 3)), 1000);
          } else if (this.attempt.length === this.goal) {
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
    if (this.state.count === '00' && this.secretCelebration === 3) {
      this.displayWinSignal();
      this.secretCelebration = 0;
    } else {
      this.secretCelebration++;
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
    if (this.state.count === '01') {
      this.setState({count: '00'});
      this.memory = [];
      this.attempt = [];
      clearTimeout(this.notify);
      return;
    }
    this.notify && clearTimeout(this.notify);
    this.memory = [];
    this.attempt = [];
    this.setState({startButton: this.state.startButton + 1});
    this.pickNewColor(Math.floor(Math.random() * 4));
  }

  toggleStrictMode() {
    this.setState({strict: !this.state.strict, strictButton: this.state.strictButton + 1});
    if (this.state.strict) {
      document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 100px black';
    } else {
      document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 100px #e04006';
    }
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
    document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 100px #ff4d4d';
    setTimeout(() => {
       this.setState({boxShadow: this.greenShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 110px #00b300';
     }, 250);
    setTimeout(() => {
       this.setState({boxShadow: this.blueShadow})
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 120px #3333ff';
     }, 500);
    setTimeout(() => {
       this.setState({boxShadow: this.yellowShadow})
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 130px #ffff66';
     }, 750);
    setTimeout(() => {
       this.setState({boxShadow: this.redShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 140px #ff4d4d';
     }, 1000);
    setTimeout(() => {
       this.setState({boxShadow: this.greenShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 150px #00b300';
     }, 1250);
    setTimeout(() => {
       this.setState({boxShadow: this.blueShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 160px #3333ff';
     }, 1500);
    setTimeout(() => {
       this.setState({boxShadow: this.yellowShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 170px #ffff66';
     }, 1750);
    setTimeout(() => {
       this.setState({boxShadow: this.redShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 180px #ff4d4d';
     }, 2000);
    setTimeout(() => {
       this.setState({boxShadow: this.greenShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 190px #00b300';
     }, 2250);
    setTimeout(() => {
       this.setState({boxShadow: this.blueShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 200px #3333ff';
     }, 2500);
    setTimeout(() => {
       this.setState({boxShadow: this.yellowShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 210px #ffff66';
     }, 2750);
    setTimeout(() => {
       this.setState({boxShadow: this.redShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 220px #ff4d4d';
     }, 3000);
    setTimeout(() => {
       this.setState({boxShadow: this.greenShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 230px #00b300';
     }, 3250);
    setTimeout(() => {
       this.setState({boxShadow: this.blueShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 240px #3333ff';
     }, 3500);
    setTimeout(() => {
       this.setState({boxShadow: this.yellowShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 250px #ffff66';
     }, 3750);
    setTimeout(() => {
       this.setState({boxShadow: this.redShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 260px #ff4d4d';
     }, 4000);
    setTimeout(() => {
       this.setState({boxShadow: this.greenShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 270px #00b300';
     }, 4250);
    setTimeout(() => {
       this.setState({boxShadow: this.blueShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 280px #3333ff';
     }, 4500);
    setTimeout(() => {
       this.setState({boxShadow: this.yellowShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 290px #ffff66';
     }, 4750);
    setTimeout(() => {
       this.setState({boxShadow: this.redShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 300px #ff4d4d';
     }, 5000);
    setTimeout(() => {
       this.setState({boxShadow: this.greenShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 310px #00b300';
     }, 5250);
    setTimeout(() => {
       this.setState({boxShadow: this.blueShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 320px #3333ff';
     }, 5500);
    setTimeout(() => {
       this.setState({boxShadow: this.yellowShadow});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 330px #ffff66';
     }, 5750);
    setTimeout(() => {
       this.setState({boxShadow: '0px 0px 50px #e04006, inset 0 0 20px #e04006'});
       document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 340px #e04006';
     }, 6000);
    setTimeout(() => {
      this.celebrating = false;
      this.attempt = [];
      this.memory = [];
      this.setState({boxShadow: this.normalShadow, count: '00'});
      document.getElementsByClassName('main')[1].style.boxShadow = 'inset 0 0 100px black';
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

  setGoal() {
    if (this.attempt.length || this.memory.length) return;
    if (this.state.count === '00') {
      this.goal = 1;
      this.updateCount(this.goal);
    } else {
      this.goal++;
      this.updateCount(this.goal);
    }
  }

}



export default App;
