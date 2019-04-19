import React, { useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
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
    <>
      <p className="gameMode">{gameMode}</p>
      <div
        tabIndex="0"
        className="vertical-selection"
        ref={ul}
        onKeyDown={handleKeyDown}
      >
        <div className="conf-group">
          <div className="initial-letters">
            {initials[0]}
            <p className="small">1P</p>
          </div>
          {initials.length > 1 && (
            <>
              <p className="small vs">vs</p>
              <div className="initial-letters">
                {initials[1]}
                <p className="small">2P</p>
              </div>
            </>
          )}
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
    </>
  );
};
