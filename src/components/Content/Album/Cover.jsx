import React from 'react';
import './Cover.css';

function Cover({ imageUrl }) {
  return (
    <div className='Cover'>
      <img src={imageUrl} alt="Album Cover" />
    </div>
  );
}

export default Cover;
