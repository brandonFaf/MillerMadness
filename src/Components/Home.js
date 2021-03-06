import React from 'react';
import introMusic from '../sounds/1Intro.wav';
import music from '../sounds/2 Start Screen.wav';
import basketball from '../img/Basketball.png';
import soundContext from '../utilities/soundContext';
import background from '../img/BG_Intro_screen.gif';
export default class Home extends React.Component {
  state = {
    go: false
  };
  componentDidMount() {
    const musicObj = new Audio(introMusic);
    musicObj.play();
    musicObj.onended = this.startNextTrack(musicObj);
    console.log('loadBackground');
    this.setState({ background, musicObj });
    setTimeout(() => {
      this.setState({ go: true });
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

  navigate = () => {
    this.props.history.push('/game/game-modes');
  };
  componentWillUnmount() {
    if (this.state.music) {
      this.state.music.stop();
    }
    if (this.state.musicObj) {
      this.state.musicObj.pause();
    }
  }
  render() {
    const { go } = this.state;
    return (
      <>
        <div
          style={{
            background: `url('${this.state.background}') bottom center repeat`,
            zIndex: -2,
            position: 'absolute',
            height: '100vh',
            width: '100vw'
          }}
        />
        <div className="container" tabIndex="0">
          <div className={go ? 'beth on' : 'beth off'} />
          <div className={go ? 'travis on' : 'travis off'} />
          <div className="logo-big" />
          <input onChange={this.navigate} autoFocus className="navigateInput" />
          <div className="horizontal-selection start">
            <img alt="basketball" src={basketball} />
            <span className="selected"> Start </span>
            <img alt="basketball" src={basketball} />
          </div>
        </div>
      </>
    );
  }
}
