import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import GameMode from "./Components/GameMode";
import HighScores from "./Components/HighScores";
import End from "./Components/End";
import GamePlay from "./Components/GamePlay";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Route path="/" exact component={Home} />
          <Route path="/game-modes" exact component={GameMode} />
          <Route path="/game-play/:time/:players" exact component={GamePlay} />
          <Route path="/game-over/:time/:players" exact component={End} />
          <Route path="/high-scores" exact component={HighScores} />
        </div>
      </div>
    );
  }
}

export default App;
