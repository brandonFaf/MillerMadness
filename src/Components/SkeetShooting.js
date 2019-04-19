import React, { Component } from 'react';
import { SettingsContext } from '../SettingsContext';
import openSocket from 'socket.io-client';
import classNames from 'classnames';
import './gameplay.scss';
import introMusic from '../sounds/4 Count down.wav';
import music from '../sounds/5 Game Play Loop (1).wav';
import blip from '../sounds/sfx_sounds_Blip6.wav';
import fanfare from '../sounds/sfx_sounds_fanfare1.wav';
import fanfare2 from '../sounds/sfx_sounds_fanfare2.wav';
import fanfare3 from '../sounds/sfx_sounds_fanfare3.wav';
import powerup from '../sounds/sfx_sounds_powerup18.wav';
import logo from '../img/Logo-small.png';
const socket = openSocket('http://localhost:3001');

class SkeetShooting extends Component {
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
    const musicObj = new Audio(introMusic);
    // const nextTrack = new Audio(music);
    const blipTrack = new Audio(blip);
    const fanfareTrack = new Audio(fanfare);
    const fanfare2Track = new Audio(fanfare2);
    const fanfare3Track = new Audio(fanfare3);
    const powerupTrack = new Audio(powerup);
    const sounds = [fanfare2Track, fanfare3Track, fanfareTrack];
    this.setState({
      powerupTrack,
      sounds
    });
    musicObj.play();
    musicObj.onended = this.startNextTrack(musicObj);

    socket.on('player1', () => {
      if (!this.props.CrissCross) {
        this.updatePlayer('score1');
      } else {
        this.updatePlayer('score2');
      }
    });
    socket.on('player2', () => {
      if (!this.props.CrissCross && !this.props.Team) {
        this.updatePlayer('score2');
      } else {
        this.updatePlayer('score1');
      }
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
        clearInterval(this.countdown);
      }
    }, 1000);
    this.startTimer();
  }
  startNextTrack = prevMusic => () => {
    prevMusic.pause();
    var url = music;

    /* --- set up web audio --- */
    //create the context
    var context = new AudioContext();
    //...and the source
    var source = context.createBufferSource();
    //connect it to the destination so you can hear it.
    source.connect(context.destination);

    /* --- load buffer ---  */
    var request = new XMLHttpRequest();
    //open the request
    request.open('GET', url, true);
    //webaudio paramaters
    request.responseType = 'arraybuffer';
    //Once the request has completed... do this
    request.onload = function() {
      context.decodeAudioData(
        request.response,
        function(response) {
          /* --- play the sound AFTER the buffer loaded --- */
          //set the buffer to the response we just received.
          source.buffer = response;
          //start(0) should play asap.
          source.start(0);
          source.loop = true;
        },
        function() {
          console.error('The request failed.');
        }
      );
    };
    //Now that the request has been defined, actually make the request. (send it)
    request.send();
    this.setState({ music: source });
  };
  startTimer = () => {
    const blipTrack = new Audio(blip);
    this.timer = setInterval(() => {
      if (this.state.time <= 6 && this.state.time !== 0) {
        blipTrack.play();
      }
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
    this.state.music.stop();
    console.log('clearing timer');
  }
  renderCountdown = () => {
    return <div className="countdown">{this.state.countdown}</div>;
  };
  updatePlayer = score => {
    if (this.state.countdown <= 0) {
      if (this.state.time < 10) {
        this.state.powerupTrack.play();
      } else {
        this.state.sounds[Math.floor(Math.random() * 3)].play();
      }
      this.setState(state => ({ [score]: state[score] + 1 }));
    }
  };
  player1 = () => {
    this.updatePlayer('score1');
  };
  player2 = () => {
    this.updatePlayer('score2');
  };
  render() {
    const { settings } = this.props;

    return (
      <div>
        <button onClick={this.player1}>Player1</button>
        <button onClick={this.player2}>Player2</button>
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
