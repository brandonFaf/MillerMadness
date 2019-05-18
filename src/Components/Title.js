import React from 'react';

export default ({ gameMode }) => {
  return (
    <div className="logo">
      <p className="title back">{gameMode}</p>
      <p className="title front">{gameMode}</p>
    </div>
  );
};
