import React from 'react';
import { useAlbum } from '../../../Contexts/AlbumContext';

function AlbumTitle() {
  const { album } = useAlbum();

  // Display "Loading..." or similar text while the album is null (fetching data)
  if (!album) return <div>Loading...</div>;

  return (
    <div className='AlbumTitle'>
      {album.name} {/* Render the fetched album's title */}
    </div>
  );
}

export default AlbumTitle;
