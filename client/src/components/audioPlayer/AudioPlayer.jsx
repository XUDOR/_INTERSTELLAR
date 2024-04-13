import React, { useEffect, useRef } from "react";
import './AudioPlayer.css';

const AudioPlayer = (props) => {
  const {
    queue,
    currentSongIndex,
    setCurrentSongIndex,
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
    audioPlayer,
    repeat
  } = props;

  const playNextSong = () => {
    if (repeat) {
      audioPlayer.current.currentTime = 0;
      audioPlayer.current.play();
    } else {
      let nextIndex = (currentSongIndex + 1) % queue.length;
      setCurrentSongIndex(nextIndex);
    }
  };

  const playPreviousSong = () => {
    let prevIndex = (currentSongIndex - 1 + queue.length) % queue.length;
    setCurrentSongIndex(prevIndex);
  };

  // Automatically play the current song when it changes
  useEffect(() => {
    if (currentSong && audioPlayer.current) {
      audioPlayer.current.play().catch((error) => {
        console.error("Error attempting to play:", error);
      });
      setIsPlaying(true);
    }
  }, [currentSong, audioPlayer, setIsPlaying]);

  // Handle what happens when audio ends
  useEffect(() => {
    const player = audioPlayer.current;
    const handleSongEnd = () => {
      console.log("Audio playback ended");
      playNextSong();
    };

    if (player) {
      player.addEventListener('ended', handleSongEnd);
      return () => player.removeEventListener('ended', handleSongEnd);
    }
  }, [audioPlayer, playNextSong]);

  return (
    <div className="player">
      <audio
        ref={audioPlayer}
        src={currentSong ? currentSong.audio_url : ''}
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
      <div className="audio-file-name">
        {currentSong ? currentSong.name : "No song loaded"}
      </div>
      <button className="Previous" onClick={playPreviousSong}>prev</button>
      <button className="Play" onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button className="Next" onClick={playNextSong}>Next</button>
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
