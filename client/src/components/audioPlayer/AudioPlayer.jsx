import React, { useEffect, useCallback, useState } from "react";
import { ReactComponent as PlayIcon } from '../../images/Icons/play-blue.svg';
import { ReactComponent as PauseIcon } from '../../images/Icons/Pause.svg';
import { ReactComponent as NextIcon } from '../../images/Icons/next.svg';
import { ReactComponent as PreviousIcon } from '../../images/Icons/back.svg';

import './AudioPlayer.css';

const AudioPlayer = (props) => {
  const {
    queue = [],
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
  } = props;

  // State to track the index of the currently playing song
  const [, setCurrentPlayingIndex] = useState(0);

  // Function to update the currently playing song index
  const updateCurrentPlayingIndex = useCallback((index) => {
    setCurrentPlayingIndex(index);
  }, []);

  // Play the next song
  const playNextSong = useCallback(() => {
    let nextIndex = (currentSongIndex + 1) % queue.length;
    setCurrentSongIndex(nextIndex);
  }, [currentSongIndex, queue.length, setCurrentSongIndex]);

  // Play the previous song
  const playPreviousSong = useCallback(() => {
    let prevIndex = (currentSongIndex - 1 + queue.length) % queue.length;
    setCurrentSongIndex(prevIndex);
  }, [currentSongIndex, queue.length, setCurrentSongIndex]);

  // Update the currently playing song index when the current song changes
  useEffect(() => {
    updateCurrentPlayingIndex(currentSongIndex);
  }, [currentSongIndex, updateCurrentPlayingIndex]);

  // Play the current song when it changes
  useEffect(() => {
    if (currentSong && audioPlayer.current) {
      audioPlayer.current.play().catch((error) => {
        console.error("Error attempting to play:", error);
      });
      setIsPlaying(true);
    }
  }, [currentSong, audioPlayer, setIsPlaying]);

  // Handle the end of the current song
  useEffect(() => {
    const player = audioPlayer.current;
    const handleSongEnd = () => {
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
      <button className="Back" onClick={playPreviousSong}>
        <PreviousIcon className="svg-icon" />
      </button>
      <button className="Play" onClick={togglePlayPause}>
        {isPlaying ? <PauseIcon className="svg-icon" /> : <PlayIcon className="svg-icon" />}
      </button>
      <button className="Next" onClick={playNextSong}>
        <NextIcon className="svg-icon" />
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
