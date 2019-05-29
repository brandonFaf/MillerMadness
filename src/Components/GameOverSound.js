import React, { Component } from 'react';
import music from '../sounds/8 Game Over.wav';
import End from './End';
import context from '../utilities/soundContext';
import { SettingsContext } from '../SettingsContext';

class GameOverSound extends Component {
  state = {
    source: null
  };
  componentDidMount = () => {
    if (!this.props.sound) {
      return;
    }
    var url = music;

    /* --- set up web audio --- */
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
    this.setState({ source });
  };
  componentWillUnmount() {
    if(this.state.source){
      this.state.source.stop();
    }
  }
  render() {
    return <End {...this.props} />;
  }
}

const GameOverSoundConntected = props => {
  return (
    <SettingsContext.Consumer>
      {settings => <GameOverSound settings={settings} {...props} />}
    </SettingsContext.Consumer>
  );
};
export default GameOverSoundConntected;

