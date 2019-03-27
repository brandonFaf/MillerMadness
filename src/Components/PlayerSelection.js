import React, { useState, useContext, useEffect, useRef } from 'react';
import Logo from './Logo';
import { SettingsContext } from '../SettingsContext';
import classnames from 'classnames';
export default ({ history }) => {
  const { setPlayers } = useContext(SettingsContext);
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
      <h3>Players</h3>
      <ul ref={ul} tabIndex="0" className="players" onKeyDown={handleKeyDown}>
        <li className={classnames(cursor === 0 && 'selected')}>1P</li>
        <li className={classnames(cursor === 1 && 'selected')}>2P</li>
      </ul>
    </div>
  );
};
