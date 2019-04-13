import React, { useState, useEffect } from 'react';
import basketball from '../img/Basketball.png';
import introMusic from '../sounds/1Intro.wav';
import music from '../sounds/2 Start Screen.wav';
import Sound from 'react-sound';
export default ({ history }) => {
  const [go, setGo] = useState(false);
  const [nextTrack, setNextTrack] = useState(Sound.status.STOPPED);
  // const audioRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setGo(true);
    }, 1000);
  }, [go]);
  useEffect(() => {
    const music = new Audio(introMusic);
    music.play().catch(error => {
      console.log(error);
    });
    // music.loop = true;
    music.onended = startNextTrack(music);
  });
  const navigate = () => {
    history.push('/game/game-modes');
  };
  const startNextTrack = music => () => {
    music.pause();
    setNextTrack(Sound.status.PLAYING);
  };
  return (
    <>
      {/* <Sound
        url={introMusic}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={startNextTrack}
      /> */}
      <Sound url={music} playStatus={nextTrack} loop autoLoad />
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
