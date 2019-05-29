import React, { Component } from 'react';
import { SettingsContext } from '../../SettingsContext';
import openSocket from 'socket.io-client';
import classNames from 'classnames';
import './../gameplay.scss';
import fanfare from '../../sounds/sfx_sounds_fanfare1.wav';
import fanfare2 from '../../sounds/sfx_sounds_fanfare2.wav';
import fanfare3 from '../../sounds/sfx_sounds_fanfare3.wav';
import powerup from '../../sounds/sfx_sounds_powerup18.wav';
import Title from '../Title';
import blip from '../../sounds/sfx_sounds_Blip6.wav';
const socket = openSocket('http://localhost:3001');

class Classic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: props.settings.players,
      score1: 0,
      time: (props.settings.time || 300) + 3,
      score2: 0,
      gameMode: props.settings.gameMode
    };
  }
  componentDidMount() {
    const fanfareTrack = new Audio(fanfare);
    const fanfare2Track = new Audio(fanfare2);
    const fanfare3Track = new Audio(fanfare3);
    const powerupTrack = new Audio(powerup);
    const sounds = [fanfare2Track, fanfare3Track, fanfareTrack];
    this.setState({
      powerupTrack,
      sounds
    });

    socket.on('player1', () => {
      this.player1();
    });
    socket.on('player2', () => {
      this.player2();
    });
    this.startTimer();
  }
  componentDidUpdate() {
    if (this.props.end) {
      this.endGame();
    }
  }
  startTimer = () => {
    const blipTrack = new Audio(blip);
    this.timer = setInterval(() => {
      if (
        this.state.time <= 6 &&
        this.state.time !== 0 &&
        this.props.settings.sound
      ) {
        blipTrack.play();
      }
      if (this.state.time > 0) {
        this.setState(prevState => {
          return {
            time: --prevState.time
          };
        });
      } else {
        this.endGame();
      }
    }, 1000);
  };
  endGame = () => {
    this.props.settings.setScores(this.state.score1, this.state.score2);
    this.props.history.push('/game-over');
  };
  updatePlayer = score => {
    if (this.props.settings.sound) {
      if (this.state.time < 10) {
        this.state.powerupTrack.play();
      } else {
        this.state.sounds[Math.floor(Math.random() * 3)].play();
      }
    }
    if (this.state.time < 10) {
      this.setState(state => ({ [score]: state[score] + 3 }));
    } else {
      this.setState(state => ({ [score]: state[score] + 2 }));
    }
  };
  player1 = () => {
    if (!this.props.CrissCross) {
      this.updatePlayer('score1');
    } else {
      this.updatePlayer('score2');
    }
  };
  player2 = () => {
    if (!this.props.CrissCross && !this.props.Team) {
      this.updatePlayer('score2');
    } else {
      this.updatePlayer('score1');
    }
  };
  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('clearing timer');
  }
  render() {
    const { settings } = this.props;

    return (
      <>
        {/* <button onClick={this.player1}>Player1</button>
        <button onClick={this.player2}>Player2</button> */}
        <div className="gameplay">
          <div className="time">
            <div className="seconds">{this.state.time}</div>
            <div>seconds</div>
          </div>
          <div
            className={classNames('score', {
              solo: this.state.players === 1 || this.props.Team,
              'score-1': this.state.players === 2 && !this.props.Team
            })}
          >
            <div className="numbers">
              {this.props.Mystery ? '?' : this.state.score1}
            </div>
            {this.state.players === 2 && !this.props.Team ? (
              <div>{settings.initials[0]}</div>
            ) : (
              <div className="small">POINTS</div>
            )}
          </div>
          <div className="small-logo">
            <Title gameMode={this.state.gameMode} />
          </div>
          {this.state.players > 1 && !this.props.Team && (
            <div className="score score-2">
              <div className="numbers">
                {this.props.Mystery ? '?' : this.state.score2}
              </div>
              <div>{settings.initials[1]}</div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const ClassicConnected = props => {
  return (
    <SettingsContext.Consumer>
      {settings => <Classic settings={settings} {...props} />}
    </SettingsContext.Consumer>
  );
};

export default ClassicConnected;
