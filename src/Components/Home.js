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
        <h3>Home</h3>
        <div className="horizontal-selection">
          <img alt="basketball" src={basketball} />
          <span> Start </span>
          <img alt="basketball" src={basketball} />
        </div>
      </div>
    </>
  );
};
