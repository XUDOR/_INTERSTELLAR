import React, { useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext.js';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import './Player.css';




const Player = () => {
  const {
    currentSong,
    handleLoadedData,
    handleTimeUpdate,
    setIsPlaying,
    handleSeekMouseDown,
    handleSeekMouseUp,
    calculateTime,
    currentTime,
    duration,
    handleSeekChange,
    handleVolumeChange,
    togglePlayPause,
    isPlaying,
    isSeeking,
    volume,
  } = useContext(CentralQueueContext);

  return (
    <div className="Player">
      <AudioPlayer
        currentSong={currentSong}
        handleLoadedData={handleLoadedData}
        handleTimeUpdate={handleTimeUpdate}
        setIsPlaying={setIsPlaying}
        handleSeekMouseDown={handleSeekMouseDown}
        handleSeekMouseUp={handleSeekMouseUp}
        handleSeekChange={handleSeekChange}
        handleVolumeChange={handleVolumeChange}
        volume={volume}
        duration={duration}
        togglePlayPause={togglePlayPause}
        calculateTime={calculateTime}
        currentTime={currentTime}
        isPlaying={isPlaying}
        isSeeking={isSeeking}
      />
    </div>
  );
};

export default Player;
