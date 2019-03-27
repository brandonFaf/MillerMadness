import React, { useState, useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import Logo from './Logo';
import classnames from 'classnames';
export default ({ history, ...props }) => {
  const { initials, scores } = useContext(SettingsContext);
  const [cursor, setCursor] = useState(0);
  const ul = useRef(null);
  const winner = scores.indexOf(Math.max(...scores));

  const handleKeyDown = e => {
    e.preventDefault();
    if (e.keyCode === 38 || e.keyCode === 40) {
      setCursor((cursor + 1) % 2);
    } else if (e.keyCode === 39) {
      if (cursor === 0) {
        history.push(`/game-play`);
      } else {
        history.push(`/game-modes`);
      }
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <div className="container">
      <Logo />
      <h3>Game Over</h3>
      {initials.length === 1 ? (
        <div>
          {initials[0]} = {scores[0]}
        </div>
      ) : (
        <>
          <div> {initials[winner]} Wins! </div>
          <div>
            {initials[0]} = {scores[0]}
          </div>
          <div>
            {initials[1]} = {scores[1]}
          </div>
        </>
      )}
      <ul ref={ul} tabIndex="0" className="players" onKeyDown={handleKeyDown}>
        <li className={classnames({ selected: cursor === 0 })}>Retry</li>
        <li className={classnames({ selected: cursor === 1 })}>Home</li>
      </ul>
    </div>
  );
};
