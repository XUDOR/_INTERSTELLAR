import React, { useEffect } from 'react'; // Corrected import to include useEffect
import { useAlbum } from '../../../Contexts/AlbumContext';

function AlbumTitle({ albumId }) {
  const { album, setAlbum } = useAlbum();

  useEffect(() => {
    if (albumId) {
      fetch(`/api/albums/${albumId}`)
        .then(res => res.json())
        .then(data => setAlbum(data))
        .catch(error => console.error("Failed to fetch album", error));
    }
  }, [albumId, setAlbum]);

  if (!album) return <div>Loading...</div>;

  return <div className='AlbumTitle'>{album.name}</div>;
}

export default AlbumTitle;
