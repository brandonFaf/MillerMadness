import React from 'react';
import useMenu from '../utilities/useMenu';

export default () => {
  const [moveAudio, selectAudio] = useMenu();

  return (
    <div>
      {moveAudio}
      {selectAudio}
    </div>
  );
};
