import React, { useState } from "react";
import Logo from "./Logo";
export default ({ history }) => {
  const [cursor, setCursor] = useState(1);
  const handleKeyDown = e => {
    e.preventDefault();
    console.log(e.keyCode);
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 1) {
      setCursor(cursor - 1);
    } else if (e.keyCode === 40 && cursor < 2) {
      setCursor(cursor + 1);
    } else if (e.keyCode === 13) {
      history.push(`/game-play/5/${cursor}`);
    }
  };

  return (
    <div className="container">
      <Logo />
      <h3>Players</h3>
      <ul tabIndex="0" className="players" onKeyDown={handleKeyDown}>
        <li className={cursor === 1 && "selected"}>1P</li>
        <li className={cursor === 2 && "selected"}>2P</li>
      </ul>
    </div>
  );
};
