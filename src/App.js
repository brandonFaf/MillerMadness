import React, { Component } from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import Home from './Components/Home';
import GameMode from './Components/GameMode';
import HighScores from './Components/HighScores';
import End from './Components/End';
import GamePlay from './Components/GamePlay';
import Players from './Components/Players';
import Time from './Components/Time';
import Confirmation from './Components/Confirmation';
import SettingStore from './SettingsContext';
import PlayerSelection from './Components/PlayerSelection';
class App extends Component {
  state = { go: false };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ go: true });
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        <div className={this.state.go ? 'beth on' : 'beth off'} />
        <div className={this.state.go ? 'travis on' : 'travis off'} />
        <SettingStore>
          <Route path="/" exact component={Home} />
          <Route path="/game-modes" exact component={GameMode} />
          <Route path="/players" exact component={PlayerSelection} />
          <Route path="/players/:players/" component={Players} />
          <Route path="/time" exact component={Time} />
          <Route path="/confirmation" exact component={Confirmation} />
          <Route path="/game-play" exact component={GamePlay} />
          <Route path="/game-over" exact component={End} />
          <Route path="/high-scores" exact component={HighScores} />
        </SettingStore>
      </div>
    );
  }
}

export default App;
