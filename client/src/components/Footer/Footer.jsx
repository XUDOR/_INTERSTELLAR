// Footer.jsx, located at src/components/Footer/Footer.jsx
import React from 'react';
import Player from './Player';
import Radio from './Radio';
import Shop from './Shop';
import Nav from './Nav';
import Admin from './Admin';
import User from './User';
import Downloads from './Downloads';
import './Footer.css';

const Footer = (props) => {
  const {
    audioFileName,
    handleLoadedData,
    handleTimeUpdate, setIsPlaying, handleSeekMouseDown, 
    handleSeekMouseUp, calculateTime, currentTime, duration, 
    handleSeekChange, handleVolumeChange, togglePlayPause, 
    isPlaying,isSeeking,volume, audioPlayer  } = props



  return (
    <footer className="Footer">
      <Admin />
      <Downloads />
      <User />
      <Nav />
      <Player 
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
      <Radio />
      <Shop />
    </footer>
  );
};

export default Footer;