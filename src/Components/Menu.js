import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GameMode from './GameMode';
import Players from './Players';
import Time from './Time';
import Confirmation from './Confirmation';
import PlayerSelection from './PlayerSelection';
import Logo from './Logo';
import menuMusic from '../sounds/3 Menu Music.wav';
import useMenu from '../utilities/useMenu';
export default ({ match }) => {
  const [moveAudio, selectAudio, musicAudio] = useMenu(menuMusic);
  return (
    <>
      {moveAudio}
      {selectAudio}
      {musicAudio}
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
