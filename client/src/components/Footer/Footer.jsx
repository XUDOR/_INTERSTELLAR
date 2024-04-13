import React from 'react';
import Player from './Player';
import Queue from './Queue';
import Shop from './Shop';
import Nav from './Nav';
import Admin from './Admin';
import User from './User';
import Downloads from './Downloads';
import './Footer.css';

const Footer = (props) => {
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
    <div className="AppContainer">
      <footer className="Footer">
        <Admin />
        <Downloads />
        <User />
        <Nav />
        <Player
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
        <Shop />
      </footer>
      <Queue />
    </div>
  );
};

export default Footer;
