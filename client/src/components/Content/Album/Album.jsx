import React from 'react';
import Cover from './Cover';
import './Album.css';
// Uncomment below when ready for dynamic image fetching
// import useAuthenticatedImage from '../../../hooks/useAuthenticatedImage';
import coverImage from '../../../images/CHARLOTTA_cover.png';

function Album({ albumId }) { // Assuming albumId might be used for fetching specific album images
  // For dynamic image fetching, uncomment the line below
  // const coverImageUrl = useAuthenticatedImage(albumId);
  const coverImageUrl = coverImage; // Use the imported image for now

  console.log(`Album Component: Displaying album with ID ${albumId} using cover image URL`, coverImageUrl);

  return (
    <div className='Album'>
      {/* Pass the image URL to the Cover component */}
      <Cover imageUrl={coverImageUrl} />
    </div>
  );
}

export default Album;
