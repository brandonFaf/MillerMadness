import React, { useState, useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import basketball from '../img/Basketball.png';
import classnames from 'classnames';
export default ({ history }) => {
  const { gameMode, setPlayers } = useContext(SettingsContext);
  const [cursor, setCursor] = useState(0);
  const ul = useRef(null);
  const handleKeyDown = e => {
    e.preventDefault();
    console.log(e.keyCode);
    if (e.keyCode === 87 || e.keyCode === 83) {
      setCursor((cursor + 1) % 2);
    } else if (e.keyCode === 68) {
      setPlayers(cursor + 1);
      history.push(`/game/players/${cursor + 1}`);
    } else if (e.keyCode === 65) {
      setPlayers(cursor + 1);
      history.goBack();
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <>
      <p className="gameMode">{gameMode}</p>
      <p>Players</p>
      <div ref={ul} tabIndex="0" className="players" onKeyDown={handleKeyDown}>
        <div className="horizontal-selection">
          {cursor === 0 && <img alt="basketball" src={basketball} />}
          <span className={classnames({ selected: cursor === 0 })}>1P</span>
          {cursor === 0 && <img alt="basketball" src={basketball} />}
        </div>

        <div className="horizontal-selection">
          {cursor === 1 && <img alt="basketball" src={basketball} />}
          <span className={classnames({ selected: cursor === 1 })}>2P</span>
          {cursor === 1 && <img alt="basketball" src={basketball} />}
        </div>
      </div>
    </>
  );
};
