/* eslint-disable no-unused-vars */
import React from 'react';
import useKey from 'use-key-hook';
import moveSound from '../sounds/sfx_menu_move4.wav';
import selectSound from '../sounds/sfx_menu_select1.wav';
import { useAudio } from 'react-use';

export default () => {
  const [moveAudio, _, moveControls] = useAudio({ src: moveSound });
  const [selectAudio, __, selectControls] = useAudio({ src: selectSound });

  useKey(usedKey => {
    if (usedKey === 97 || usedKey === 100) selectControls.play();
    if (usedKey === 119 || usedKey === 115) {
      moveControls.play();
    }
  });
  return [moveAudio, selectAudio];
};
