// Song.jsx
import React from 'react';
import './Song.css'

function Song({ song }) {
  return (
    <div className='Song'>
      <div>{song.title} - {song.artist}</div>
      {/* Display more song details here */}
    </div>
  );
}

export default Song;
