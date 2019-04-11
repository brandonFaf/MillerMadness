import React, { Component } from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import Home from './Components/Home';
import HighScores from './Components/HighScores';
import End from './Components/End';
import GamePlay from './Components/GamePlay';
import SettingStore from './SettingsContext';
import Menu from './Components/Menu';
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
        <div className="background" />
        <SettingStore>
          <Route path="/" exact component={Home} />
          <Route path="/game/:any*" component={Menu} />
          <Route path="/game-play" exact component={GamePlay} />
          <Route path="/game-over" exact component={End} />
          <Route path="/high-scores" exact component={HighScores} />
        </SettingStore>
      </div>
    );
  }
}

export default App;
