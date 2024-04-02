// Song.jsx
import React from 'react';
import './Song.css';

function Song({ song }) { // Accept song as props
  return (
    <div className='Song'>
      {/* Display song information */}
      <div className="Song-title">{song.name}</div> {/* Example property access */}
      {/* Add more song details here */}
    </div>
  );
}

export default Song;
