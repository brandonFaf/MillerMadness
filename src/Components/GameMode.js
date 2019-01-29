import React, { Component } from "react";
import { Link } from "react-router-dom";

class GameMode extends Component {
  render() {
    return (
      <div>
        <h3>Game Modes</h3>
        <Link to="/game-play">~ Start ~</Link>
      </div>
    );
  }
}

export default GameMode;
