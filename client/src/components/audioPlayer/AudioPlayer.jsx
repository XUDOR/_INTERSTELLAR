import React, { useEffect, useCallback } from "react";
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
    repeat
  } = props;

  const playNextSong = useCallback(() => {
    let nextIndex = (currentSongIndex + 1) % queue.length;
    console.log("Current index before update:", currentSongIndex);
    console.log("Next index:", nextIndex);
    setCurrentSongIndex(nextIndex);
  }, [currentSongIndex, queue.length, setCurrentSongIndex]);

  const playPreviousSong = useCallback(() => {
    let prevIndex = (currentSongIndex - 1 + queue.length) % queue.length;
    setCurrentSongIndex(prevIndex);
  }, [currentSongIndex, queue.length, setCurrentSongIndex]);

  useEffect(() => {
    console.log(`Current song index is now ${currentSongIndex}, URL: ${queue[currentSongIndex]?.audio_url}`); // Debug log to see current song
    if (currentSong && audioPlayer.current) {
      audioPlayer.current.play().catch((error) => {
        console.error("Error attempting to play:", error);
      });
      setIsPlaying(true);
    }
  }, [currentSong, audioPlayer, setIsPlaying]);

  useEffect(() => {
    const player = audioPlayer.current;
    const handleSongEnd = () => {
      console.log("Audio playback ended, moving to next song"); // Debug log
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
