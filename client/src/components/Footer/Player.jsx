//Footer/Player
import React from 'react';
import AudioPlayer from '../audioPlayer/AudioPlayer';
import './Player.css';


const Player = (props) => {
  const {
    audioFileName,
    handleLoadedData,
    handleTimeUpdate, setIsPlaying, handleSeekMouseDown,
    handleSeekMouseUp, calculateTime, currentTime, duration,
    handleSeekChange, handleVolumeChange, togglePlayPause,
    isPlaying, isSeeking, volume, audioPlayer } = props



  return (
    <div className="Player">
      <AudioPlayer
        audioFileName={audioFileName}
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
