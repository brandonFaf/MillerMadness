import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
export default ({ history, ...props }) => {
  const [cursor, setCursor] = useState(0);
  const ul = useRef(null);
  const handleKeyDown = e => {
    e.preventDefault();
    const { time, players } = props.match.params;
    console.log(e.keyCode);
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 || e.keyCode === 40) {
      setCursor((cursor + 1) % 2);
    } else if (e.keyCode === 13) {
      if (cursor == 0) {
        history.push(`/game-play/${time}/${players}`);
      } else {
        history.push(`/game-modes`);
      }
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <div className="container">
      <Logo />
      <h3>Game Over</h3>
      <ul ref={ul} tabIndex="0" className="players" onKeyDown={handleKeyDown}>
        <li className={cursor === 0 && "selected"}>Retry</li>
        <li className={cursor === 1 && "selected"}>Home</li>
      </ul>
    </div>
  );
};
