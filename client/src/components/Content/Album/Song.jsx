// Song.jsx
import React from 'react';
import './Song.css'

// Adjusting the Song component to match your data structure
function Song({ song }) {
  console.log("Rendering song:", song);
  return (
    <div className='Song'>
      {/* Assuming `name` is the correct property based on your state log */}
      <div>{song.name}</div>
      {/* Display more song details here */}
    </div>
  );
}


export default Song;
