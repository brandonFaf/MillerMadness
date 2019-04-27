import React, { useContext } from 'react';
import useMenu from '../utilities/useMenu';
import { SettingsContext } from '../SettingsContext';

export default () => {
  const [moveAudio, selectAudio] = useMenu();
  const { sound } = useContext(SettingsContext);
  const result = sound ? (
    <div>
      {moveAudio}
      {selectAudio}
    </div>
  ) : (
    <div />
  );
  return result;
};
