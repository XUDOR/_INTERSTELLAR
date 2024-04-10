import React, { useState, useRef } from "react";
import audioFile from '../../Audio-Assets/CHARLOTTA.mp3';
import '../../App.css';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isSeeking, setIsSeeking] = useState(false);

  const audioPlayer = useRef(); // Reference to the audio component

  // File name for display. If the audio file path is static, this can remain constant.
  const audioFileName = "CHARLOTTA.mp3"; // Directly using the file name since the path is static

  // Toggles the play/pause state
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  // Sets the duration once audio metadata is loaded
  const handleLoadedData = () => {
    setDuration(audioPlayer.current.duration);
    if (isPlaying) audioPlayer.current.play();
  };

  // Updates the current time as the audio plays
  const handleTimeUpdate = () => {
    if (!isSeeking) {
      setCurrentTime(audioPlayer.current.currentTime);
    }
  };

  // Handles the change in volume
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioPlayer.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Handles the change in the seek bar
  const handleSeekChange = (e) => {
    const newTime = e.target.value;
    audioPlayer.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Indicates the user has started dragging the seek bar
  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  // Indicates the user has finished dragging the seek bar
  const handleSeekMouseUp = () => {
    setIsSeeking(false);
    audioPlayer.current.currentTime = currentTime;
  };

  // Converts the time in seconds to a displayable format
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  return (
    <div className="player">
      <audio
        ref={audioPlayer}
        src={audioFile}
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
