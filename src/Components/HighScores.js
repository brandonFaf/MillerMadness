import React, { Component } from "react";
import { Link } from "react-router-dom";
class HighScores extends Component {
  render() {
    return (
      <div>
        <h3>High Scores</h3>
        <Link to="/game-modes">~ Back ~</Link>
      </div>
    );
  }
}

export default HighScores;
