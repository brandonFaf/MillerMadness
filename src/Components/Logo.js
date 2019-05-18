import React from 'react';
import Title from './Title';

export default ({ gameMode }) => {
  return (
    <>
      <div className="beth" />
      <div className="travis" />
      <Title gameMode={gameMode} />
    </>
  );
};
