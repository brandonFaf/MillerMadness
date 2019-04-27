import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import GameMode from './GameMode';
import Players from './Players';
import Time from './Time';
import Confirmation from './Confirmation';
import PlayerSelection from './PlayerSelection';
import Logo from './Logo';
import menuMusic from '../sounds/3 Menu Music.wav';
import MenuSounds from './MenuSounds';
import context from '../utilities/soundContext';
export default class Menu extends Component {
  state = {
    source: null
  };
  componentDidMount = () => {
    var url = menuMusic;

    /* --- set up web audio --- */
    //create the context

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
    this.setState({ source });
    //Now that the request has been defined, actually make the request. (send it)
    request.send();
  };
  componentWillUnmount = () => {
    this.state.source.stop();
  };
  render() {
    const { match } = this.props;
    return (
      <>
        <MenuSounds />
        <div className="container">
          <Logo />
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
