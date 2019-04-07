import React, { useState, useContext, useEffect, useRef } from 'react';
import Logo from './Logo';
import { SettingsContext } from '../SettingsContext';
import up from '../img/up.png';
import down from '../img/down.png';
export default ({ history }) => {
  const { gameMode, time, setTime } = useContext(SettingsContext);
  const choices = [5, 30, 40, 50, 60, 70, 80, 90];
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
    if (e.keyCode === 37) history.goBack();
    if (e.keyCode === 38) setCursor(getPrevCursor());
    else if (e.keyCode === 40) setCursor(getNextCursor());
    else if (e.keyCode === 39) {
      setTime(choices[cursor]);
      history.push(`/confirmation`);
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <div className="container">
      <Logo />
      <p className="gameMode">{gameMode}</p>
      <p className="medium">Time Limit</p>
      <div
        tabIndex="0"
        className="verticle-select"
        ref={ul}
        onKeyDown={handleKeyDown}
      >
        <img src={up} alt="up" />
        <p className="selected">{choices[cursor]}</p>
        <img src={down} alt="down" />
        <p className="small">seconds</p>
      </div>
    </div>
  );
};
