import React, { Component } from 'react';
import { SettingsContext } from '../SettingsContext';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.match.params.time,
      players: props.match.params.players,
      score1: 0,
      score2: 0
    };
  }
  componentDidMount() {
    socket.on('player1', () => {
      console.log('hahahahahaha');
      this.setState(state => ({ score1: state.score1 + 1 }));
    });
    socket.on('player2', () =>
      this.setState(state => ({ score2: state.score2 + 1 }))
    );

    this.timer = setInterval(() => {
      if (this.state.time > 0) {
        this.setState(prevState => {
          return {
            time: --prevState.time
          };
        });
      } else {
        this.props.history.push(
          '/game-over/' +
            this.props.match.params.time +
            '/' +
            this.props.match.params.players
        );
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('clearing timer');
  }
  player1 = () => {
    socket.emit('player1');
  };
  player2 = () => {
    socket.emit('player2');
  };
  render() {
    return (
      <SettingsContext.Consumer>
        {settings => {
          return (
            <div>
              <h3>{this.state.time} </h3>
              <h3>
                {settings.initials[0]} - {this.state.score1}
              </h3>
              <h3>
                {settings.initials[1]} - {this.state.score2}
              </h3>
              <button onClick={this.player1}>Player1</button>
              <button onClick={this.player2}>Player2</button>
            </div>
          );
        }}
      </SettingsContext.Consumer>
    );
  }
}

export default GamePlay;
