import React, { useState, useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import up from '../img/up.png';
import down from '../img/down.png';
import Logo from './Logo';
export default ({ history }) => {
  const { gameMode, time, setTime } = useContext(SettingsContext);
  const choices = [30, 40, 50, 60, 70, 80, 90];
  let index = choices.indexOf(time);
  index = index > 0 ? index : 0;
  const [cursor, setCursor] = useState(index);
  const ul = useRef(null);
  const getPrevCursor = () =>
    cursor - 1 < 0 ? choices.length - 1 : cursor - 1;
  const getNextCursor = () => (cursor + 1) % choices.length;
  const handleKeyDown = e => {
    e.preventDefault();
    console.log(e.keyCode);
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 65) history.goBack();
    if (e.keyCode === 87) setCursor(getNextCursor());
    else if (e.keyCode === 83) setCursor(getPrevCursor());
    else if (e.keyCode === 68) {
      setTime(choices[cursor]);
      history.push(`/game/confirmation`);
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <>
      <Logo gameMode={gameMode} />
      <p className="small">Time Limit</p>
      <div
        tabIndex="0"
        className="vertical-selection"
        ref={ul}
        onKeyDown={handleKeyDown}
      >
        <img src={up} className="arrow" alt="up" />
        <p className="selected">{choices[cursor]}</p>
        <img src={down} className="arrow" alt="down" />
      </div>
      <p className="small">seconds</p>
    </>
  );
};
