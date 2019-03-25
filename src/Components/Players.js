import React, { useState, useContext } from 'react';
import PlayerEntry from './PlayerEntry';
import Logo from './Logo';
import { SettingsContext } from '../SettingsContext';
export default ({
  history,
  match: {
    params: { players }
  }
}) => {
  const [activePlayer, setPlayer] = useState(1);
  const context = useContext(SettingsContext);
  const goNext = player => {
    if (+players === 1) {
      context.setInitials(player, 1);
      history.push('/time');
    } else {
      if (activePlayer === 1) {
        setPlayer(player => ++player);
        context.setInitials(player, 1);
      } else {
        context.setInitials(player, 2);
        history.push(`/time`);
      }
    }
  };
  const goBack = player => {
    if (activePlayer === 1) {
      history.goBack();
    } else {
      setPlayer(1);
      context.setInitials(player, 2);
    }
  };

  const showPlayer = () => {
    if (players === 1) {
      return <PlayerEntry goNext={goNext} />;
    } else {
      const [initials1 = '', initials2 = ''] = context.initials;

      return (
        <>
          {activePlayer === 1 ? (
            <PlayerEntry
              goNext={goNext}
              key={1}
              goBack={goBack}
              initials={initials1}
            />
          ) : (
            <PlayerEntry
              player="2P"
              goNext={goNext}
              key={2}
              goBack={goBack}
              initials={initials2}
            />
          )}
        </>
      );
    }
  };
  return (
    <div className="container">
      <Logo />
      <h3>{activePlayer} Player</h3>
      {showPlayer()}
    </div>
  );
};
