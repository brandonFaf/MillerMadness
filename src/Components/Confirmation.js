import React, { useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import Logo from './Logo';
export default ({ history }) => {
  const { time, initials, gameMode } = useContext(SettingsContext);
  const ul = useRef(null);
  const handleKeyDown = e => {
    e.preventDefault();
    console.log(e.keyCode);
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 37) history.goBack();
    else if (e.keyCode === 39) {
      history.push(`/game-play`);
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <div className="container">
      <Logo />
      <h3>{gameMode}</h3>
      <div
        tabIndex="0"
        className="verticle-select"
        ref={ul}
        onKeyDown={handleKeyDown}
      >
        <p>{time}</p>
        <p>seconds</p>

        <p>
          {initials[0]} {initials.length > 1 && `vs ${initials[1]}`}
        </p>
        <p>{initials.length}P</p>
        <p className="selected">Start</p>
      </div>
    </div>
  );
};
