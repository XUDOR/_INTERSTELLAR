// Cover.jsx

import React from 'react';
import './Cover.css';

function Cover({ imageUrl }) {
  

  return (
    <div className="cover-container">
      <img 
        src={imageUrl} 
        alt="Album Cover" 
        onError={(e) => { 
          console.error('Failed to load image, setting fallback:', imageUrl);
          e.target.onerror = null;
          e.target.src = `${process.env.PUBLIC_URL}/Fallback-image.png`; // Use PUBLIC_URL for images in the public folder
          
        }} 
      />
    </div>
  );
}

export default Cover;
