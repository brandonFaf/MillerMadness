import React, { useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import Logo from './Logo';
import basketball from '../img/Basketball.png';
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
      <p className="gameMode">{gameMode}</p>
      <div
        tabIndex="0"
        className="verticle-select"
        ref={ul}
        onKeyDown={handleKeyDown}
      >
        <div className="conf-group">
          <p>
            {initials[0]}{' '}
            {initials.length > 1 && (
              <>
                <span className="small">vs</span> {initials[1]}
              </>
            )}
          </p>
          <p className="small">{initials.length}P</p>
        </div>
        <div className="conf-group">
          <p>{time}</p>
          <p className="small">seconds</p>
          <div className="horizontal-selection">
            <img alt="basketball" src={basketball} />
            <span className="selected">Start</span>
            <img alt="basketball" src={basketball} />
          </div>
        </div>
      </div>
    </div>
  );
};
