import React, { useContext } from 'react';
import { SettingsContext } from '../SettingsContext';
import Classic from './Classic';
import SkeetShooting from './SkeetShooting';
export default props => {
  const { gameMode } = useContext(SettingsContext);

  switch (gameMode) {
    case 'Classic':
      return <Classic {...props} />;
    case 'Crisscross':
      return <Classic CrissCross {...props} />;
    case 'Skeet Shooting':
      return <SkeetShooting {...props} />;
    case 'Sharp Shooter':
      return <Classic {...props} />;
    case 'Double or Nothing':
      return <Classic {...props} />;
    case 'Team':
      return <Classic Team {...props} />;
    default:
      break;
  }
};
