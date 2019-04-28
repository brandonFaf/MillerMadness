import React from 'react';
import { SettingsContext } from '../SettingsContext';
import Classic from './GameModes/Classic';
import SkeetShooting from './GameModes/SkeetShooting';
import SkeetShootingTeam from './GameModes/SkeetShootingTeam';
import introMusic from '../sounds/4 Count down.wav';
import blip from '../sounds/sfx_sounds_Blip6.wav';
import music from '../sounds/5 Game Play Loop (1).wav';
import soundContext from '../utilities/soundContext';
class GamePlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown: 3,
      players: props.settings.players,
      gameMode: props.settings.gameMode
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
        clearInterval(this.countdown);
      }
    }, 1000);
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
    if (this.props.settings.sound) {
      this.state.music.stop();
    }
  }
  getGameMode = props => {
    const { gameMode } = this.props.settings;
    switch (gameMode) {
      case 'Classic':
        return <Classic {...this.props} />;
      case 'Crisscross':
        return <Classic CrissCross {...this.props} />;
      case 'Skeet Shooting':
        return <SkeetShooting {...this.props} />;
      case 'Skeet Shooting Team':
        return <SkeetShootingTeam {...this.props} />;
      case 'Sharp Shooter':
        return <Classic {...this.props} />;
      case 'Double or Nothing':
        return <Classic {...this.props} />;
      case 'Team':
        return <Classic Team {...this.props} />;
      default:
        break;
    }
  };
  renderCountdown = () => {
    return <div className="countdown">{this.state.countdown}</div>;
  };
  render() {
    return (
      <div>
        {this.state.countdown > 0 && this.renderCountdown()}
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
