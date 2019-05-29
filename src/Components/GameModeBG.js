import React, { Component } from 'react';
import GameMode from './GameMode';
import { playMenuMusic, clearSource } from '../utilities/soundContext';
import { SettingsContext } from '../SettingsContext';
import outroGif from '../img/BG_Logo_outro.gif';
class GameModeBG extends Component {
  state = {
    map: {},
    out: false
  };
  componentDidMount = () => {
    if (this.props.settings.sound) {
      playMenuMusic();
      console.log('play music');
    }
  };

  next = route => {
    this.setState({ out: true }, () => {
      setTimeout(() => this.props.history.push(route), 600);
    });
  };
  onKey = e => {
    const { sound, setSound } = this.props.settings;
    let { map } = this.state;
    map[e.keyCode] = e.type === 'keydown';

    if (map[87] && map[83]) {
      setSound();
      if (sound) {
        console.log('mute');
        clearSource();
      } else {
        console.log('un-mute');
        playMenuMusic();
      }
      this.setState({ map });
    }
  };
  componentWillCatch = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <>
        {this.state.out ? (
          <div
            style={{
              background: `url('${outroGif}?a=${Math.random()}') bottom center repeat`,
              zIndex: -2,
              position: 'absolute',
              height: '100vh',
              width: '100vw'
            }}
          />
        ) : (
          <div className={'game-background'} />
        )}
        <div className="container" onKeyDown={this.onKey} onKeyUp={this.onKey}>
          <GameMode {...this.props} next={this.next} />
        </div>
      </>
    );
  }
}

const GameModeBGConntected = props => {
  return (
    <SettingsContext.Consumer>
      {settings => <GameModeBG settings={settings} {...props} />}
    </SettingsContext.Consumer>
  );
};
export default GameModeBGConntected;
