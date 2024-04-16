import React, { useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext.js';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import './Player.css';




const Player = () => {
  const {
    
  } = useContext(CentralQueueContext);

  return (
    <div className="Player">
      <AudioPlayer
        
      />
    </div>
  );
};

export default Player;
