import React, { useContext } from 'react';
import { SettingsContext } from '../SettingsContext';
import Classic from './Classic';
import SkeetShooting from './SkeetShooting';
export default () => {
  const { gameMode } = useContext(SettingsContext);

  switch (gameMode) {
    case 'Classic':
      return <Classic />;
    case 'Crisscross':
      return <Classic CrissCross />;
    case 'Skeet Shooting':
      return <SkeetShooting />;
    case 'Sharp Shooter':
      return <Classic />;
    case 'Double or Nothing':
      return <Classic />;
    case 'Team':
      return <Classic Team />;
    default:
      break;
  }
};
