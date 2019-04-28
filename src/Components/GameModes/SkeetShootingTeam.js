import React, { Component } from 'react';
import { SettingsContext } from '../../SettingsContext';
import openSocket from 'socket.io-client';
import classNames from 'classnames';
import './../gameplay.scss';
import fanfare from '../../sounds/sfx_sounds_fanfare1.wav';
import fanfare2 from '../../sounds/sfx_sounds_fanfare2.wav';
import fanfare3 from '../../sounds/sfx_sounds_fanfare3.wav';
import powerup from '../../sounds/sfx_sounds_powerup18.wav';
import logo from '../../img/Logo-small.png';

const socket = openSocket('http://localhost:3001');

class SkeetShootingTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: props.settings.players,
      score1: 0,
      score2: 0,
      gameMode: props.settings.gameMode,
      round: 0
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
  }
  startGame = () => {
    //say shoot
    this.setState({ go: true, player1: false, player2: false });
    this.goTo = setTimeout(() => {
      this.setState({ go: false });
      this.checkMiss();
    }, 3000);

    // this.setState({ firedSeconds: time.getSeconds(), firedMilli:time.getMilliseconds() });
    var rand = Math.round(Math.random() * (10000 - 3000)) + 3000; // generate new time (between 10sec and 5sec)
    this.to = setTimeout(this.startGame, rand);
  };
  checkMiss = () => {
    const { player1, player2 } = this.state;
    if (!(player1 || player2)) {
      const { score1, score2 } = this.state;
      this.props.settings.setScores(score1, score2);
      this.props.history.push('/game-over');
    }
  };

  componentWillUnmount() {
    clearTimeout(this.to);
    clearTimeout(this.goTo);
    this.state.music.stop();
    console.log('clearing timer');
  }
  updatePlayer = player => {
    if (this.state.countdown <= 0) {
      this.state.powerupTrack.play();

      this.setState(state => {
        let playerScore = state[`score${player}`];
        if (state.go) {
          playerScore++;
        }
        return { [`player${player}`]: true, [`score${player}`]: playerScore };
      });
    }
  };
  player1 = () => {
    if (!(this.state.player1 || this.state.player2)) {
      this.updatePlayer(1);
    }
  };
  player2 = () => {
    if (!(this.state.player1 || this.state.player2)) {
      this.updatePlayer(2);
    }
  };
  render() {
    const { settings } = this.props;

    return (
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
            <div className="small">POINTS</div>
          </div>
        )}
      </div>
    );
  }
}

const SkeetShootingConnected = props => {
  return (
    <SettingsContext.Consumer>
      {settings => <SkeetShootingTeam settings={settings} {...props} />}
    </SettingsContext.Consumer>
  );
};

export default SkeetShootingConnected;
