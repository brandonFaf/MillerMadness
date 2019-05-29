import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import GameMode from './GameMode';
import Players from './Players';
import Time from './Time';
import Confirmation from './Confirmation';
import PlayerSelection from './PlayerSelection';
import menuMusic from '../sounds/3 Menu Music.wav';
import MenuSounds from './MenuSounds';
import context from '../utilities/soundContext';
import { SettingsContext } from '../SettingsContext';
class Menu extends Component {
  state = {
    source: null,
    map: {},
    playing: true
  };
  componentDidMount = () => {
    var url = menuMusic;

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
    this.setState({ source, playing: this.props.settings.sound });
    //Now that the request has been defined, actually make the request. (send it)
    request.send();
  };
  componentWillUnmount = () => {
    this.state.source.stop();
  };
  onKey = e => {
    const { setSound } = this.props.settings;
    let { map, playing } = this.state;
    map[e.keyCode] = e.type === 'keydown';

    if (map[87] && map[83]) {
      setSound();
      if (playing) {
        console.log('mute');
        context.suspend();
      } else {
        console.log('un-mute');
        context.resume();
      }
      playing = !playing;
    }
    this.setState({ map, playing });
  };
  render() {
    const { match } = this.props;
    return (
      <>
        <MenuSounds />
        <div className="container" onKeyDown={this.onKey} onKeyUp={this.onKey}>
          <Switch>
            <Route path={`${match.path}/game-modes`} component={GameMode} />
            <Route
              path={`${match.path}/players`}
              exact
              component={PlayerSelection}
            />
            <Route
              path={`${match.path}/players/:players/`}
              exact
              component={Players}
            />
            <Route path={`${match.path}/time`} component={Time} />
            <Route
              path={`${match.path}/confirmation`}
              component={Confirmation}
            />
          </Switch>
        </div>
      </>
    );
  }
}

const MenuConntected = props => {
  return (
    <SettingsContext.Consumer>
      {settings => <Menu settings={settings} {...props} />}
    </SettingsContext.Consumer>
  );
};
export default MenuConntected;