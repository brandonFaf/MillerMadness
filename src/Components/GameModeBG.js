import React, { Component } from 'react';
import GameMode from './GameMode';
import MenuSounds from './MenuSounds';
import context, { playMenuMusic } from '../utilities/soundContext';
import { SettingsContext } from '../SettingsContext';
import outroGif from '../img/BG_Logo_outro.gif';
class GameModeBG extends Component {
  state = {
    map: {},
    playing: true,
    out: false
  };
  componentDidMount = () => {
    console.log('here');
    playMenuMusic();
  };

  next = route => {
    this.setState({ out: true }, () => {
      setTimeout(() => this.props.history.push(route), 2000);
    });
  };
  onKey = e => {
    const { setSound } = this.props.settings;
    let { map, playing } = this.state;
    map[e.keyCode] = e.type === 'keydown';

    if (map[87] && map[91]) {
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
    return (
      <>
        <MenuSounds />
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
