import React from 'react';
import { SettingsContext } from '../SettingsContext';
import Classic from './GameModes/Classic';
import StrikeOut from './GameModes/StrikeOut';
import SkeetShooting from './GameModes/SkeetShooting';
import introMusic from '../sounds/4 Count down.wav';
import blip from '../sounds/sfx_sounds_Blip6.wav';
import music from '../sounds/5 Game Play Loop (1).wav';
import soundContext from '../utilities/soundContext';
import Double from './GameModes/Double.js';
class GamePlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: 3,
      start: false,
      players: props.settings.players,
      gameMode: props.settings.gameMode,
      map: {}
    };
  }
  componentDidMount() {
    const musicObj = new Audio(introMusic);
    // const nextTrack = new Audio(music);
    const blipTrack = new Audio(blip);
    if (this.props.settings.sound) {
      musicObj.play();
      musicObj.onended = this.startNextTrack(musicObj);
      blipTrack.play();
      this.setState({ musicObj });
    }
    this.countdown = setInterval(() => {
      if (this.state.countdown >= 1 && this.props.settings.sound)
        blipTrack.play();
      if (this.state.countdown > 0) {
        this.setState(prevState => {
          return {
            countdown: --prevState.countdown
          };
        });
      } else {
        this.setState({ start: true });
        clearInterval(this.countdown);
      }
    }, 1000);
    document.getElementById('gameplay').focus();
  }
  startNextTrack = prevMusic => () => {
    prevMusic.pause();
    var url = music;

    /* --- set up web audio --- */
    //...and the source
    var source = soundContext.createBufferSource();
    //connect it to the destination so you can hear it.
    source.connect(soundContext.destination);

    /* --- load buffer ---  */
    var request = new XMLHttpRequest();
    //open the request
    request.open('GET', url, true);
    //webaudio paramaters
    request.responseType = 'arraybuffer';
    //Once the request has completed... do this
    request.onload = function() {
      soundContext.decodeAudioData(
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

  componentWillUnmount() {
    if (this.props.settings.sound && this.state.music) {
      this.state.music.stop();
    }
    if (this.state.musicObj) {
      this.state.musicObj.pause();
    }
    clearInterval(this.countdown);
  }
  getGameMode = props => {
    const { gameMode } = this.props.settings;
    const { start, end } = this.state;
    switch (gameMode) {
      case 'Classic':
        return <Classic end={end} {...this.props} />;
      case 'Mystery':
        return <Classic end={end} {...this.props} Mystery />;
      case 'Crisscross':
        return <Classic CrissCross end={end} {...this.props} />;
      case 'Strike Out':
        return <StrikeOut end={end} start={start} {...this.props} />;
      case 'Skeet Shooting':
        return <SkeetShooting end={end} start={start} {...this.props} />;
      case 'Double or Nothing':
        return <Double end={end} {...this.props} />;
      case 'Team':
        return <Classic Team end={end} {...this.props} />;
      default:
        break;
    }
  };
  renderCountdown = () => {
    return <div className="countdown">{this.state.countdown}</div>;
  };
  onKey = e => {
    const { map } = this.state;
    map[e.keyCode] = e.type === 'keydown';
    console.log(map);
    if (map[65] && map[68]) {
      this.setState({ end: true });
    }
  };
  render() {
    return (
      <div
        id="gameplay"
        tabIndex="0"
        onKeyDown={this.onKey}
        onKeyUp={this.onKey}
      >
        {this.state.countdown > 0 && this.renderCountdown()}
        {/* 
        <button onClick={this.player1}>Player1</button>
        <button onClick={this.player2}>Player2</button> */}
        {this.getGameMode()}
      </div>
    );
  }
}
const GamePlayConntected = props => {
  return (
    <SettingsContext.Consumer>
      {settings => <GamePlay settings={settings} {...props} />}
    </SettingsContext.Consumer>
  );
};
export default GamePlayConntected;
