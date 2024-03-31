// Album.jsx
import React from 'react';
import Cover from './Cover';
import './Album.css';

// Potentially use this hook for dynamically fetching an authenticated image
// import useAuthenticatedImage from '../../../hooks/useAuthenticatedImage';
import coverImage from '../../../images/CHARLOTTA_cover.png';


function Album() {
  // Uncomment and use the line below for dynamic image fetching
  // const coverImageUrl = useAuthenticatedImage();
  const coverImageUrl = coverImage; // Use the imported image for now
  return (
    <div className='Album'>
      {/* Pass the image URL to the Cover component */}
      <Cover imageUrl={coverImageUrl} />
    </div>
  );
}

export default Album;
