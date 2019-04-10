import React, { Component } from 'react';
import { SettingsContext } from '../SettingsContext';
import openSocket from 'socket.io-client';
import classNames from 'classnames';
import './gameplay.scss';
const socket = openSocket('http://localhost:3001');

class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 3,
      time: (props.settings.time || 300) + 3,
      players: props.settings.players,
      score1: 0,
      score2: 0,
      gameMode: props.settings.gameMode
    };
  }
  componentDidMount() {
    socket.on('player1', () => {
      this.setState(state => ({ score1: state.score1 + 1 }));
    });
    socket.on('player2', () =>
      this.setState(state => ({ score2: state.score2 + 1 }))
    );
    this.countdown = setInterval(() => {
      if (this.state.countdown > 0) {
        this.setState(prevState => {
          return {
            countdown: --prevState.countdown
          };
        });
      } else {
        clearInterval(this.countdown);
      }
    }, 1000);
    this.startTimer();
  }
  startTimer = () => {
    console.log('start timer');
    this.timer = setInterval(() => {
      if (this.state.time > 0) {
        this.setState(prevState => {
          return {
            time: --prevState.time
          };
        });
      } else {
        this.props.settings.setScores(this.state.score1, this.state.score2);
        this.props.history.push('/game-over');
      }
    }, 1000);
  };
  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('clearing timer');
  }
  renderCountdown = () => {
    return <div className="countdown">{this.state.countdown}</div>;
  };

  render() {
    const { settings } = this.props;

    return (
      <div>
        {this.state.countdown > 0 && this.renderCountdown()}
        <div className="gameplay">
          <div className="time">
            <div className="seconds">{this.state.time}</div>
            <div>seconds</div>
          </div>
          <div
            className={classNames('score', {
              solo: this.state.players === 1,
              'score-1': this.state.players === 2
            })}
          >
            {this.state.players === 2 && <div>{settings.initials[0]}</div>}
            <div className="numbers"> {this.state.score1}</div>
            <div className="small">POINTS</div>
          </div>
          <div className="small-logo">
            <img src="https://via.placeholder.com/196x64" alt="logo" />
            <div>{this.state.gameMode}</div>
          </div>
          {this.state.players > 1 && (
            <div className="score score-2">
              <div>{settings.initials[1]}</div>
              <div className="numbers"> {this.state.score2}</div>
              <div className="small">POINTS</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const GamePlayConnected = props => {
  return (
    <SettingsContext.Consumer>
      {settings => <GamePlay settings={settings} {...props} />}
    </SettingsContext.Consumer>
  );
};

export default GamePlayConnected;
