import React from "react";
import Logo from "./Logo";
import Navigate from "./Navigate";

export default Navigate(props => (
  <>
    <Logo />
    <h3>Home</h3>
    <span>~ Start ~</span>
  </>
))("/game-modes");
