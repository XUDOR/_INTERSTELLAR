import React from 'react';
import './Cover.css';

// Assuming Cover accepts imageUrl as a prop
function Cover({ imageUrl }) {
  return (
    <div className='Cover'>
      {/* Render the image using the imageUrl prop */}
      <img src={imageUrl} alt="Album Cover" />
    </div>
  );
}

export default Cover;
