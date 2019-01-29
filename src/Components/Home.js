import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
export default () => {
  return (
    <>
      <Logo />
      <h3>Home</h3>
      <Link to="/game-modes">~ Start ~</Link>
    </>
  );
};
