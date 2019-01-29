import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

class End extends Component {
  render() {
    return (
      <>
        <Logo />
        <h3>Game Over</h3>
        <Link
          to={
            "/game-play/" +
            this.props.match.params.time +
            "/" +
            this.props.match.params.players
          }
        >
          Retry
        </Link>
        <Link to="/game-modes">Home</Link>
      </>
    );
  }
}

export default End;
