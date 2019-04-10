import React, { useState, useContext, useEffect, useRef } from 'react';
import Logo from './Logo';
import { SettingsContext } from '../SettingsContext';
import basketball from '../img/Basketball.png';
import up from '../img/up.png';
import down from '../img/down.png';
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
    <>
      <div className="container">
        <Logo />
        <div
          tabIndex="0"
          className="vertical-selection gameMode-selection"
          ref={ul}
          onKeyDown={handleKeyDown}
        >
          <img className="arrow" src={up} alt="up" />
          <p>{choices[getPrevCursor()]}</p>
          <div className="horizontal-selection">
            <img alt="basketball" src={basketball} />
            <span className="selected">{choices[cursor]}</span>
            <img alt="basketball" src={basketball} />
          </div>
          <p>{choices[getNextCursor()]}</p>
          <img src={down} className="arrow" alt="down" />
        </div>
      </div>
    </>
  );
};
