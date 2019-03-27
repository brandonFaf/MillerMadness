import React, { useState, useContext, useEffect, useRef } from 'react';
import Logo from './Logo';
import { SettingsContext } from '../SettingsContext';
export default ({ history }) => {
  const { gameMode, setGameMode } = useContext(SettingsContext);
  const choices = ['Free for all', 'Knockout', '3 pt shootout'];
  let index = choices.indexOf(gameMode);
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
      setGameMode(choices[cursor]);
      history.push(`/players`);
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <div className="container">
      <Logo />
      <h3>Time Limit</h3>
      <div
        tabIndex="0"
        className="verticle-select"
        ref={ul}
        onKeyDown={handleKeyDown}
      >
        <p>{choices[getPrevCursor()]}</p>
        <p className="selected">{choices[cursor]}</p>
        <p>{choices[getNextCursor()]}</p>
      </div>
    </div>
  );
};
