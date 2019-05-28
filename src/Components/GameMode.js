import React, { useState, useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../SettingsContext';
import basketball from '../img/Basketball.png';
import up from '../img/up.png';
import down from '../img/down.png';
import highScoresLabel from '../img/highScoresLabel.png';
import { getHighscores } from '../utilities/highscores';
export default ({ history, next }) => {
  const { gameMode, setGameMode, setPlayers } = useContext(SettingsContext);

  const timelessModes = ['Skeet Shooting', 'Strike Out'];
  const choices = [
    'Classic',
    'Mystery',
    'Crisscross',
    'Strike Out',
    'Skeet Shooting',
    'Double or Nothing',
    'Team'
  ];
  let index = choices.indexOf(gameMode);
  index = index > 0 ? index : 0;
  const [moveNext, setMoveNext] = useState(false);
  const [cursor, setCursor] = useState(index);
  const [highScores, setHighScores] = useState(getHighscores(choices[cursor]));
  const ul = useRef(null);
  const getPrevCursor = () =>
    cursor - 1 < 0 ? choices.length - 1 : cursor - 1;
  const getNextCursor = () => (cursor + 1) % choices.length;
  const handleKeyDown = e => {
    if (!moveNext) {
      e.preventDefault();
      console.log(e.keyCode);
      // arrow up/down button should select next/previous list element
      if (e.keyCode === 65) history.push('/');
      if (e.keyCode === 87) {
        setCursor(getPrevCursor());
        setHighScores(getHighscores(choices[getPrevCursor()]));
      } else if (e.keyCode === 83) {
        setCursor(getNextCursor());
        setHighScores(getHighscores(choices[getNextCursor()]));
      } else if (e.keyCode === 68) {
        const gameMode = choices[cursor];
        setGameMode(gameMode);
        setMoveNext(true);
        if (gameMode.indexOf('Team') > -1 || gameMode.indexOf('Skeet') > -1) {
          setPlayers(2);
          next('/game/players/2');
        } else {
          next('/game/players');
        }
      }
    }
  };
  useEffect(() => {
    ul.current.focus();
  }, [ul]);

  return (
    <>
      <div className="beth" />
      <div className="travis" />
      <div className="logo" />
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
            <p>{!timelessModes.some(x => x === choices[cursor]) && 'Time'}</p>
            <p>Date</p>
          </li>

          {highScores.map(({ time, score, initials, date }, i) => {
            return (
              <li key={i}>
                <p>{i + 1}.</p>
                <p>{initials}</p>
                <p>{score}</p>
                <p>{!timelessModes.some(x => x === choices[cursor]) && time}</p>
                <p>{date}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
