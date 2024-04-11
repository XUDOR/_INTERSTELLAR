// Song.jsx
import React from 'react';
import './Song.css';

function Song({ song, setaudioFIleName }) {
  console.log("Rendering song:", song);

  const handleClickPlay = (e) => {
    console.log("Play clicked", song);
    setaudioFIleName(song.audio_url);
    e.preventDefault(); // If needed to prevent any default behavior
  };

  // Adding accessibility enhancements
  return (
    <div className='Song' onClick={handleClickPlay} role="button" tabIndex="0">
      <div>{song.name}</div>
      {/* You can add more song details here if needed */}
    </div>
  );
}

export default Song;
