import React, { Component } from "react";
import { Link } from "react-router-dom";

class End extends Component {
  render() {
    return (
      <div>
        <h3>Game Over</h3>
        <Link to="/game-play">Retry</Link>
        <Link to="/game-modes">Home</Link>
      </div>
    );
  }
}

export default End;
