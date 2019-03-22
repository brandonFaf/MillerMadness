import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
export default ({ history }) => {
  const [cursor, setCursor] = useState(0);
  const ul = useRef(null);
  const handleKeyDown = e => {
    e.preventDefault();
    console.log(e.keyCode);
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 || e.keyCode === 40) {
      setCursor((cursor + 1) % 2);
    } else if (e.keyCode === 13) {
      history.push(`/game-play/5/${cursor + 1}`);
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <div className="container">
      <Logo />
      <h3>Players</h3>
      <ul ref={ul} tabIndex="0" className="players" onKeyDown={handleKeyDown}>
        <li className={cursor === 0 && "selected"}>1P</li>
        <li className={cursor === 1 && "selected"}>2P</li>
      </ul>
    </div>
  );
};
