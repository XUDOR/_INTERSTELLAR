import React from 'react';
import './Song.css';

function Song({ song, setCurrentSong }) {
  const handleClickPlay = (e) => {
    e.preventDefault(); // Prevent default action (important if this is in a form or link)
    console.log("Playing song:", song);
    setCurrentSong(song); // Setting the current song object
  };

  return (
    <div className='Song' onClick={handleClickPlay} role="button" tabIndex="0">
      <div>{song.name}</div>
    </div>
  );
}


export default Song;
