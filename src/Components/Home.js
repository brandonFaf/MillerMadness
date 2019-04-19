import React, { useState, useEffect } from 'react';
import { useAudio } from 'react-use';
import introMusic from '../sounds/1Intro.wav';
import music from '../sounds/2 Start Screen.wav';
import basketball from '../img/Basketball.png';
import logo from '../img/Logo.png';
export default ({ history }) => {
  const [go, setGo] = useState(false);
  // const audioRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setGo(true);
    }, 1000);
  }, [go]);
  const startNextTrack = () => {
    controls.play();
  };
  const [introAudio] = useAudio({
    src: introMusic,
    autoPlay: true,
    onEnded: startNextTrack
  });
  // eslint-disable-next-line no-unused-vars
  const [musicAudio, state, controls] = useAudio({
    src: music,
    autoPlay: false,
    loop: true,
    onEnded: startNextTrack
  });

  const navigate = () => {
    history.push('/game/game-modes');
  };
  return (
    <>
      {introAudio}
      {musicAudio}
      <div className="container" tabIndex="0" onKeyDown={navigate}>
        <div className={go ? 'beth on' : 'beth off'} />
        <div className={go ? 'travis on' : 'travis off'} />
        <img className="logo-big" src={logo} alt="logo" />
        <div className="horizontal-selection start">
          <img alt="basketball" src={basketball} />
          <span className="selected"> Start </span>
          <img alt="basketball" src={basketball} />
        </div>
      </div>
    </>
  );
};
