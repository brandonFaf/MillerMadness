import React, { Component } from 'react';
import { SettingsContext } from '../../SettingsContext';
import openSocket from 'socket.io-client';
import classNames from 'classnames';
import './../gameplay.scss';
import blip from '../../sounds/sfx_sounds_Blip6.wav';
import fanfare from '../../sounds/sfx_sounds_fanfare1.wav';
import fanfare2 from '../../sounds/sfx_sounds_fanfare2.wav';
import fanfare3 from '../../sounds/sfx_sounds_fanfare3.wav';
import powerup from '../../sounds/sfx_sounds_powerup18.wav';
import error from '../../sounds/sfx_sounds_error13.wav';
import shutdown from '../../sounds/sfx_sound_shutdown2.wav';
import logo from '../../img/Logo-small.png';
const socket = openSocket('http://localhost:3001');

class SkeetShooting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: 3,
      players: props.settings.players,
      score1: 0,
      score2: 0,
      gameMode: props.settings.gameMode,
      round: 0,
      misses1: '',
      misses2: ''
    };
  }
  componentDidMount() {
    const blipTrack = new Audio(blip);
    const fanfareTrack = new Audio(fanfare);
    const fanfare2Track = new Audio(fanfare2);
    const fanfare3Track = new Audio(fanfare3);
    const powerupTrack = new Audio(powerup);
    const errorTrack = new Audio(error);
    const shutdownTrack = new Audio(shutdown);
    const sounds = [fanfare2Track, fanfare3Track, fanfareTrack];
    this.setState({
      errorTrack,
      shutdownTrack,
      powerupTrack,
      sounds
    });

    socket.on('player1', () => {
      this.updatePlayer('score1');
      console.log('to1', this.to1);
      clearTimeout(this.to1);
    });
    socket.on('player2', () => {
      this.updatePlayer('score2');
      console.log('to2', this.to2);

      clearTimeout(this.to2);
    });
    blipTrack.play();
    this.countdown = setInterval(() => {
      if (this.state.countdown >= 1) blipTrack.play();
      if (this.state.countdown > 0) {
        this.setState(prevState => {
          return {
            countdown: --prevState.countdown
          };
        });
      } else {
        this.startGame();
        clearInterval(this.countdown);
      }
    }, 1000);
  }
  startGame = () => {
    //say shoot
    if (this.state.misses1 !== 'XXX') {
      this.to1 = setTimeout(() => {
        this.miss(1);
      }, 3000);
    }
    if (this.state.misses2 !== 'XXX') {
      this.to2 = setTimeout(() => {
        this.miss(2);
      }, 3000);
    }
    this.setState(state => {
      let { round } = state;
      round++;
      return { round, go: true };
    });
    this.goTo = setTimeout(() => {
      this.setState({ go: false });
    }, 3000);

    // this.setState({ firedSeconds: time.getSeconds(), firedMilli:time.getMilliseconds() });
    var rand = Math.round(Math.random() * (10000 - 3000)) + 3000; // generate new time (between 10sec and 5sec)
    this.to = setTimeout(this.startGame, rand);
  };
  miss = player => {
    console.log('miss being called', player);
    this.state.errorTrack.play();
    this.setState(
      state => {
        let misses = `${state[`misses${player}`]}X`;
        if (player === 1 && misses === 'XXX') {
          console.log('saving', state.score1);
          this.state.shutdownTrack.play();
          this.props.settings.setScores(state.score1);
        } else if (player === 2 && misses === 'XXX') {
          console.log('saving', state.score2);
          this.state.shutdownTrack.play();
          this.props.settings.setScores(null, state.score2);
        }
        return { [`misses${player}`]: misses };
      },
      () => {
        if (this.state.misses1 === 'XXX' && this.state.misses2 === 'XXX') {
          this.props.history.push('/game-over');
        }
      }
    );
  };

  componentWillUnmount() {
    clearTimeout(this.to);
    clearTimeout(this.to1);
    clearTimeout(this.to2);
    clearTimeout(this.goTo);
    console.log('clearing timer');
  }
  updatePlayer = score => {
    this.state.powerupTrack.play();

    this.setState(state => {
      let playerScore = state[`score${score}`];
      const misses = state[`misses${score}`];
      if (misses !== 'XXX' && state.go) {
        playerScore = state.round - misses.length;
      }

      return { [`score${score}`]: playerScore };
    });
  };
  player1 = () => {
    this.updatePlayer(1);
    console.log('to1', this.to1);
    clearTimeout(this.to1);
  };
  player2 = () => {
    this.updatePlayer(2);
    console.log('to2', this.to2);

    clearTimeout(this.to2);
  };
  render() {
    const { settings } = this.props;

    return (
      <div>
        <button onClick={this.player1}>Player1</button>
        <button onClick={this.player2}>Player2</button>
        <div className="gameplay">
          <div className="time">
            <div className="seconds">{this.state.go && 'SHOOT'}</div>
          </div>
          <div
            className={classNames('score', {
              solo: this.state.players === 1,
              'score-1': this.state.players === 2
            })}
          >
            {this.state.players === 2 && <div>{settings.initials[0]}</div>}
            <div className="numbers"> {this.state.score1}</div>
            <div className="red"> {this.state.misses1}</div>
            <div className="small">POINTS</div>
          </div>
          <div className="small-logo">
            <img src={logo} alt="logo" />
            <div>{this.state.gameMode}</div>
          </div>
          {this.state.players > 1 && (
            <div className="score score-2">
              <div>{settings.initials[1]}</div>
              <div className="numbers"> {this.state.score2}</div>
              <div className="red"> {this.state.misses2}</div>
              <div className="small">POINTS</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const SkeetShootingConnected = props => {
  return (
    <SettingsContext.Consumer>
      {settings => <SkeetShooting settings={settings} {...props} />}
    </SettingsContext.Consumer>
  );
};

export default SkeetShootingConnected;
