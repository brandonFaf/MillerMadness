import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Players from './Players';
import Time from './Time';
import Confirmation from './Confirmation';
import PlayerSelection from './PlayerSelection';
import MenuSounds from './MenuSounds';
import {
  stopMenuMusic,
  clearSource,
  playMenuMusic
} from '../utilities/soundContext';
import { SettingsContext } from '../SettingsContext';
class Menu extends Component {
  state = {
    source: null,
    map: {},
    playing: true
  };

  componentWillUnmount = () => {
    stopMenuMusic();
  };
  onKey = e => {
    const { setSound } = this.props.settings;
    let { map, playing } = this.state;
    map[e.keyCode] = e.type === 'keydown';

    if (map[87] && map[83]) {
      setSound();
      if (playing) {
        console.log('mute');
        clearSource();
      } else {
        console.log('un-mute');
        playMenuMusic();
      }
      playing = !playing;
    }
    this.setState({ map, playing });
  };
  componentWillCatch = () => {
    this.props.history.push('/');
  };
  render() {
    const { match } = this.props;
    return (
      <>
        <MenuSounds />
        <div className="container" onKeyDown={this.onKey} onKeyUp={this.onKey}>
          <Switch>
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
