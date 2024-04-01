import React, { useContext } from 'react';
import { MusicDataContext } from '../../../Contexts/MusicDataContext';

function AlbumTitle({ albumId }) {
  const { albumIndex } = useContext(MusicDataContext);
  
  // Access the album directly from the albumIndex using the albumId
  const album = albumIndex[albumId];

  // If the album data for the given ID isn't found, render a loading message or null
  if (!album) {
    console.log('Album data is not available, rendering placeholder...'); // Consider changing this to actual user feedback
    return <div>Loading...</div>; // or <div>Album Not Found</div>, based on your use case
  }

  console.log('Album data is available, rendering album name:', album.name); // Consider removing this log in production
  return <div className='AlbumTitle'>{album.name}</div>;
}

export default AlbumTitle;
