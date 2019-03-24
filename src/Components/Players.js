import React, { useState } from 'react';
import PlayerEntry from './PlayerEntry';
import Logo from './Logo';
export default ({
  history,
  match: {
    params: { players, initialInitials }
  }
}) => {
  const [activePlayer, setPlayer] = useState(1);
  const [initials, setInitials] = useState(initialInitials);
  const goNext = player => {
    if (+players === 1) {
      history.push(`/game-modes/${player}`);
    } else {
      if (activePlayer === 1) {
        setPlayer(player => ++player);
        if (initials.length > 0) {
          setInitials(initials =>
            initials.replace(new RegExp(/[A-Z]{3}\|/g), `${player}|`)
          );
        } else {
          setInitials(player);
        }
      } else {
        const allInitials = initials.replace(
          new RegExp(/\|[A-Z]{3}/g),
          `|${player}`
        );
        history.push(`/game-modes/${allInitials}`);
      }
    }
  };
  const goBack = player => {
    if (activePlayer === 1) {
      history.goBack();
    } else {
      setPlayer(1);
      setInitials(initials => `${initials}|${player}`);
    }
  };

  const showPlayer = () => {
    if (players === 1) {
      return <PlayerEntry goNext={goNext} />;
    } else {
      let initials1,
        initials2 = '';
      if (initials) {
        initials1 = initials.substr(0, 3);
        initials2 = initials.substr(4, 3);
      }
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
