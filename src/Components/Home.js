import React from 'react';
import Logo from './Logo';
import Navigate from './Navigate';
import basketball from '../img/Basketball.png';
export default Navigate(props => (
  <>
    <Logo />
    <h3>Home</h3>
    <div className="horizontal-selection">
      <img alt="basketball" src={basketball} />
      <span> Start </span>
      <img alt="basketball" src={basketball} />
    </div>
  </>
))('/game-modes');
