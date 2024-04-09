import React, { useContext } from 'react';
import { MusicDataContext } from '../../../Contexts/MusicDataContext';

function AlbumTitle({ albumId }) {
  const { albumIndex } = useContext(MusicDataContext);
  
  const album = albumIndex ? albumIndex[albumId] : null;

  if (!album) {
    // Instead of logging an error, consider how to handle this in the UI
    // For example, you might return null or a different placeholder
    // This avoids console errors for the user but ensures developers are aware during development
    return <div className='AlbumTitle'>Album Not Found</div>;
  }

  return <div className='AlbumTitle'>{album.name}</div>;
}

export default AlbumTitle;
