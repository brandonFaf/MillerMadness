import React, { Component } from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import Home from './Components/Home';
import GameMode from './Components/GameMode';
import HighScores from './Components/HighScores';
import End from './Components/End';
import GamePlay from './Components/GamePlay';
import Players from './Components/Players';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/game-modes" exact component={GameMode} />
        <Route path="/players/:players/:initialInitials?" component={Players} />
        <Route path="/game-play/:time/:players" exact component={GamePlay} />
        <Route path="/game-over/:time/:players" exact component={End} />
        <Route path="/high-scores" exact component={HighScores} />
      </div>
    );
  }
}

export default App;
