import React, { useState, useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import basketball from '../img/Basketball.png';
import up from '../img/up.png';
import down from '../img/down.png';
import highScoresLabel from '../img/highScoresLabel.png';
import { getHighscores } from '../utilities/highscores';
import moveSound from '../sounds/sfx_menu_move4.wav';
import Sound from 'react-sound';
export default ({ history }) => {
  const { gameMode, setGameMode } = useContext(SettingsContext);
  const choices = ['Free For All', 'Knockout', '3 pt shootout'];
  let index = choices.indexOf(gameMode);
  index = index > 0 ? index : 0;
  const [cursor, setCursor] = useState(index);
  const [moveSoundStatus, setMoveSoundStatus] = useState(Sound.status.STOPPED);
  const [highScores, setHighScores] = useState(getHighscores(choices[cursor]));
  const ul = useRef(null);
  const getPrevCursor = () =>
    cursor - 1 < 0 ? choices.length - 1 : cursor - 1;
  const getNextCursor = () => (cursor + 1) % choices.length;
  const handleKeyDown = e => {
    e.preventDefault();
    console.log(e.keyCode);
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 37) history.goBack();
    if (e.keyCode === 38) {
      console.log(choices[cursor]);
      playSound();
      setCursor(getPrevCursor());
      console.log(choices[cursor]);
      setHighScores(getHighscores(choices[getPrevCursor()]));
    } else if (e.keyCode === 40) {
      playSound();
      console.log(choices[cursor]);
      setCursor(getNextCursor());
      console.log(choices[cursor]);
      setHighScores(getHighscores(choices[getNextCursor()]));
    } else if (e.keyCode === 39) {
      setGameMode(choices[cursor]);
      history.push(`/game/players`);
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);
  const playSound = () => {
    setMoveSoundStatus(Sound.status.PLAYING);
  };

  return (
    <>
      <Sound url={moveSound} playStatus={moveSoundStatus} />
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
      <div className="highscores">
        <img src={highScoresLabel} alt="highscores" />
        <ul>
          <li>
            <p />
            <p>Player</p>
            <p>Score</p>
            <p>Time</p>
            <p>Date</p>
          </li>

          {highScores.map(({ time, score, initials, date }, i) => {
            return (
              <li key={i}>
                <p>{i + 1}.</p>
                <p>{initials}</p>
                <p>{score}</p>
                <p>{time}</p>
                <p>{date}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
