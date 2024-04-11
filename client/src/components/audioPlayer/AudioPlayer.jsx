import React from "react";
//import audioFile from '../../Audio-Assets/CHARLOTTA.mp3';
import './AudioPlayer.css';

const AudioPlayer = (props) => {
  const {
    audioFileName,
    handleLoadedData,
    handleTimeUpdate, setIsPlaying, handleSeekMouseDown, 
    handleSeekMouseUp, calculateTime, currentTime, duration, 
    handleSeekChange, handleVolumeChange, togglePlayPause, 
    isPlaying,isSeeking,volume, audioPlayer  } = props
  

  return (
    <div className="player">
      <audio
        ref={audioPlayer}
        src={audioFileName}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      ></audio>
      <div className="audio-file-name">
        Now Playing: {audioFileName} {/* Display the file name */}
      </div>
      <button className="Play" onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="Time">
        {calculateTime(currentTime)} / {calculateTime(duration)}
      </div>
      <div className="seek-control">
        <input
          type="range"
          min="0"
          max={duration}
          value={isSeeking ? undefined : currentTime}
          onChange={handleSeekChange}
          onMouseDown={handleSeekMouseDown}
          onMouseUp={handleSeekMouseUp}
          className="seek-slider"
          step="1"
        />
      </div>
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
