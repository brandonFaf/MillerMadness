import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GameMode from './GameMode';
import Players from './Players';
import Time from './Time';
import Confirmation from './Confirmation';
import PlayerSelection from './PlayerSelection';
import Logo from './Logo';
import Sound from 'react-sound';
import music from '../sounds/3 Menu Music.wav';

export default ({ match }) => (
  <>
    <Sound url={music} playStatus={Sound.status.PLAYING} loop autoLoad />
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
