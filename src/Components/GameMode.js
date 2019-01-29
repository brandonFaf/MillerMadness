import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

class GameMode extends Component {
  render() {
    return (
      <>
        <Logo />
        <h3>Game Modes</h3>
        <Link to="/game-play/5/2">~ Start ~</Link>
      </>
    );
  }
}

export default GameMode;
