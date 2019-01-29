import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
class HighScores extends Component {
  render() {
    return (
      <>
        <Logo />
        <h3>High Scores</h3>
        <Link to="/game-modes">~ Back ~</Link>
      </>
    );
  }
}

export default HighScores;
