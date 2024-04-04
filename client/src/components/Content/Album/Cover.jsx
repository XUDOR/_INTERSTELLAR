import React from 'react';
import './Cover.css';

function Cover({ imageUrl }) {
  console.log('Cover component trying to load image URL:', imageUrl); // Log the image URL being loaded

  return (
    <div className="cover-container">
      <img 
        src={imageUrl} 
        alt="Album Cover" 
        onError={(e) => { 
          console.error('Failed to load image, setting fallback:', imageUrl); // Log on image load failure
          e.target.onerror = null; // Prevent further onError triggers
          e.target.src = '/Fallback-image.png'; // Directly reference from the public folder
          console.log('Fallback image src set to:', e.target.src); // Log fallback image src
        }} 
      />
    </div>
  );
}

export default Cover;
