import React from "react";
import './AudioPlayer.css';

const AudioPlayer = (props) => {
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

  // Added useEffect to handle auto-play when currentSong changes
  React.useEffect(() => {
    console.log("Current song changed:", currentSong);
    if (currentSong && audioPlayer.current) {
      audioPlayer.current.play().catch((error) => {
        console.error("Error attempting to play:", error);
      });
      setIsPlaying(true);
    }
  }, [currentSong, audioPlayer, setIsPlaying]);

  return (
    <div className="player">
      <audio
        ref={audioPlayer}
        src={currentSong ? currentSong.audio_url : ''}
        onLoadedData={() => {
          console.log("Audio data loaded, attempting to play...");
          handleLoadedData();
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          console.log("Audio playback ended");
          setIsPlaying(false);
        }}
      ></audio>
      <div className="audio-file-name">
        {currentSong ? currentSong.name : "No song loaded"}
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
          max={duration || 0}
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
