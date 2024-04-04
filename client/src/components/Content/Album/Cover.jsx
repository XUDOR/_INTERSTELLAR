import React from 'react';
import './Cover.css';

function Cover({ imageUrl }) {
  return (
    <div className="cover-container"> {/* Container div with a class for styling */}
      <img 
        src={imageUrl} 
        alt="Album Cover" 
        onError={(e) => { 
          e.target.onerror = null; // Prevent further onError triggers
          e.target.src = '/Fallback-image.png'; // Directly reference from the public folder
        }} 
      />
    </div>
  );
}

export default Cover;
