import React, { useState, useContext, useEffect, useRef } from 'react';
import Logo from './Logo';
import { SettingsContext } from '../SettingsContext';
import basketball from '../img/Basketball.png';
export default ({ history }) => {
  const { gameMode, setPlayers } = useContext(SettingsContext);
  const [cursor, setCursor] = useState(0);
  const ul = useRef(null);
  const handleKeyDown = e => {
    e.preventDefault();
    console.log(e.keyCode);
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 || e.keyCode === 40) {
      setCursor((cursor + 1) % 2);
    } else if (e.keyCode === 39) {
      setPlayers(cursor + 1);
      history.push(`/players/${cursor + 1}`);
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <div className="container">
      <Logo />
      <p className="gameMode">{gameMode}</p>
      <p>Players</p>
      <div ref={ul} tabIndex="0" className="players" onKeyDown={handleKeyDown}>
        <div className="horizontal-selection">
          {cursor === 0 && <img alt="basketball" src={basketball} />}
          <span className="selected">1P</span>
          {cursor === 0 && <img alt="basketball" src={basketball} />}
        </div>

        <div className="horizontal-selection">
          {cursor === 1 && <img alt="basketball" src={basketball} />}
          <span className="selected">2P</span>
          {cursor === 1 && <img alt="basketball" src={basketball} />}
        </div>
      </div>
    </div>
  );
};
