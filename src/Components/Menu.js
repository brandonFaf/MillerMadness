import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import GameMode from './GameMode';
import Players from './Players';
import Time from './Time';
import Confirmation from './Confirmation';
import PlayerSelection from './PlayerSelection';
import Logo from './Logo';
import menuMusic from '../sounds/3 Menu Music.wav';
import useKey from 'use-key-hook';
import moveSound from '../sounds/sfx_menu_move4.wav';
import selectSound from '../sounds/sfx_menu_select1.wav';

export default ({ match }) => {
  const selectAudio = new Audio(selectSound);
  const moveAudio = new Audio(moveSound);
  useEffect(() => {
    const music = new Audio(menuMusic);
    // music.play();
    music.loop = true;
  });
  useKey(usedKey => {
    if (usedKey === 37 || usedKey === 39) selectAudio.play();
    if (usedKey === 38 || usedKey === 40) {
      moveAudio.play();
    }
  });
  return (
    <>
      <div className="container">
        <Logo />
        <Switch>
          <Route path={`${match.path}/game-modes`} component={GameMode} />
          <Route
            path={`${match.path}/players`}
            exact
            component={PlayerSelection}
          />
          <Route
            path={`${match.path}/players/:players/`}
            exact
            component={Players}
          />
          <Route path={`${match.path}/time`} component={Time} />
          <Route path={`${match.path}/confirmation`} component={Confirmation} />
        </Switch>
      </div>
    </>
  );
};
