import { useContext, useEffect, useState } from 'react';
import { MusicDataContext } from './MusicDataContext'; // Adjust the import path as necessary

const useFetchAlbum = (albumId) => {
  const { updateAlbumDetails } = useContext(MusicDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchAlbumDetails = async () => {
      try {
        const response = await fetch(`/api/albums/${albumId}`);
        if (!response.ok) throw new Error('Album not found');
        const details = await response.json();
        updateAlbumDetails(albumId, details);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [albumId, updateAlbumDetails]);

  return { isLoading, error };
};

export default useFetchAlbum;
