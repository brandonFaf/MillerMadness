import React, { useState, useEffect, useContext, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import basketball from '../img/Basketball.png';
import classnames from 'classnames';
import { saveScore } from '../utilities/highscores';
import useMenu from '../utilities/useMenu';
import Title from './Title';
import { clearSource } from '../utilities/soundContext';
export default ({ history, ...props }) => {
  const { time, gameMode, initials, scores, sound } = useContext(
    SettingsContext
  );
  const timelessModes = ['Skeet Shooting', 'Strike Out'];

  const [highscore1, setHighscore1] = useState(false);
  const [highscore2, setHighscore2] = useState(false);
  const [cursor, setCursor] = useState(0);
  const ul = useRef(null);
  const winner = scores.indexOf(Math.max(...scores));
  const [moveAudio, selectAudio] = useMenu();
  const handleKeyDown = e => {
    e.preventDefault();
    if (e.keyCode === 87 || e.keyCode === 83) {
      setCursor((cursor + 1) % 2);
    } else if (e.keyCode === 68) {
      if (cursor === 0) {
        history.push(`/game-play`);
      } else {
        clearSource();
        history.push(`/game/game-modes`);
      }
    }
  };
  useEffect(() => {
    setHighscore1(saveScore(gameMode, scores[0], initials[0], time));
    if (initials.length > 1) {
      setHighscore2(saveScore(gameMode, scores[1], initials[1], time));
    }
    ul.current.focus();
  }, [ul, gameMode, initials, time, scores]);

  return (
    <>
      {sound ? (
        <>
          {moveAudio}
          {selectAudio}{' '}
        </>
      ) : (
        <></>
      )}

      {/* {musicAudio} */}

      <div className="container">
        <div className={'beth'} />
        <div className={'travis'} />

        <div className="small-logo">
          <Title gameMode={gameMode} />
        </div>
        {initials.length === 1 || gameMode === 'Team' ? (
          <>
            <div className="winner-text">
              {timelessModes.some(x => x === gameMode)
                ? 'GAME OVER'
                : `TIME'S UP`}
            </div>
            <div className="final-score">
              <div className="player-score">
                <p className="numbers">{scores[0] || 0}</p>
                {gameMode === 'Team' ? (
                  <p className="small">{`${initials[0]} & ${initials[1]}`}</p>
                ) : (
                  <p className="small">{initials[0]}</p>
                )}
                {highscore1 && <p className="small">HIGHSCORE</p>}
              </div>
              {!timelessModes.some(x => x === gameMode) && (
                <div className="player-score">
                  <p className="time">{time}</p>
                  <p className="small">SECONDS</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="winner-text">{initials[winner]} Wins</div>
            <div className="final-score">
              <div
                className={classnames('player-score', { winner: winner === 0 })}
              >
                <p className="numbers">{scores[0]}</p>
                <p className="small">{initials[0]}</p>
                {highscore1 && <p className="small">HIGHSCORE</p>}
              </div>
              {!timelessModes.some(x => x === gameMode) && (
                <div className="player-score">
                  <p className="time">{time}</p>
                  <p className="small">SECONDS</p>
                </div>
              )}
              <div
                className={classnames('player-score', { winner: winner === 1 })}
              >
                <p className="numbers">{scores[1] || 0}</p>
                <p className="small">{initials[1]}</p>
                {highscore2 && <p className="small">HIGHSCORE</p>}
              </div>
            </div>
          </>
        )}

        <div
          ref={ul}
          tabIndex="0"
          className="players"
          onKeyDown={handleKeyDown}
        >
          <div className="horizontal-selection">
            {cursor === 0 && <img alt="basketball" src={basketball} />}
            <span className={classnames({ selected: cursor === 0 })}>
              REMATCH
            </span>
            {cursor === 0 && <img alt="basketball" src={basketball} />}
          </div>
          <div className="horizontal-selection">
            {cursor === 1 && <img alt="basketball" src={basketball} />}
            <span className={classnames({ selected: cursor === 1 })}>MENU</span>
            {cursor === 1 && <img alt="basketball" src={basketball} />}
          </div>
        </div>
      </div>
    </>
  );
};
