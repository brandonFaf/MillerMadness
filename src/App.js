import React, { Component } from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import HomeAudio from './Components/Home';
import GamePlay from './Components/GamePlay';
import SettingStore from './SettingsContext';
import Menu from './Components/Menu';
import GameOverSound from './Components/GameOverSound';
import GameModeBG from './Components/GameModeBG';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background" />
        <SettingStore>
          <Route path="/" exact component={HomeAudio} />
          <Route path="/game/game-modes" component={GameModeBG} />
          <Route path="/game/:any*" component={Menu} />
          <Route path="/game-play" exact component={GamePlay} />
          <Route path="/game-over" exact component={GameOverSound} />
        </SettingStore>
      </div>
    );
  }
}

export default App;
