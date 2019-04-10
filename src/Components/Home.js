import React, { useState, useEffect } from 'react';
import basketball from '../img/Basketball.png';
export default ({ history }) => {
  const [go, setGo] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setGo(true);
    }, 1000);
  }, [go]);
  const navigate = () => {
    history.push('/game-modes');
  };
  return (
    <>
      <div className="container" tabIndex="0" onKeyDown={navigate}>
        <div className={go ? 'beth on' : 'beth off'} />
        <div className={go ? 'travis on' : 'travis off'} />
        <div className="logo" />
        <div className="horizontal-selection start">
          <img alt="basketball" src={basketball} />
          <span className="selected"> Start </span>
          <img alt="basketball" src={basketball} />
        </div>
      </div>
    </>
  );
};
