import { useEffect } from 'react';
import { useAlbum } from './AlbumContext';

const useFetchAlbum = (id) => {
  const { setAlbum } = useAlbum();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/albums/${id}`);
        if (!response.ok) {
          throw new Error('Album not found');
        }
        const data = await response.json();
        setAlbum(data);
      } catch (error) {
        console.error("Failed to fetch album", error);
      }
    };

    fetchAlbum();
  }, [id, setAlbum]);
};

export default useFetchAlbum;
