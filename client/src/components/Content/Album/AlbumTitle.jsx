// AlbumTitle.jsx
import React, { useContext } from 'react';
import { MusicDataContext } from '../../../Contexts/MusicDataContext'; // Adjust the import path as necessary

function AlbumTitle({ albumId }) {
  const { albumIndex } = useContext(MusicDataContext);
  
  // Access the album directly from the albumIndex using the albumId
  const album = albumIndex[albumId];

  // If the album data for the given ID isn't found, show a placeholder message
  if (!album) {
    return <div>Loading or album not found...</div>;
  }

  // When album data is available, render the album name
  return <div className='AlbumTitle'>{album.name}</div>;
}

export default AlbumTitle;
