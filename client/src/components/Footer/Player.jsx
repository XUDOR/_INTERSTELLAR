// Footer/Player.jsx
import React from 'react';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import './Player.css';

const Player = (props) => {
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
    audioPlayer
  } = props;

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
        audioPlayer={audioPlayer}
        calculateTime={calculateTime}
        currentTime={currentTime}
        isPlaying={isPlaying}
        isSeeking={isSeeking}
      />
    </div>
  );
};

export default Player;
