import React from "react";
import { Link } from "react-router-dom";
export default () => {
  return (
    <div>
      <h3>Home</h3>
      <Link to="/game-modes">~ Start ~</Link>
    </div>
  );
};
