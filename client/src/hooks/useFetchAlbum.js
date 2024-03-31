import { useEffect } from 'react';
import { useAlbum } from './AlbumContext';

const useFetchAlbum = (id) => {
  const { setAlbum } = useAlbum();

  useEffect(() => {
    console.log(`Attempting to fetch album with ID: ${id}`); // Log attempt to fetch

    const fetchAlbum = async () => {
      try {
        console.log(`Sending request to /api/albums/${id}`); // Log the request URL
        const response = await fetch(`/api/albums/${id}`);
        console.log(`Response status: ${response.status}`); // Log the response status

        if (!response.ok) {
          throw new Error('Album not found');
        }

        const data = await response.json();
        console.log('Fetched album data:', data); // Log the fetched data
        setAlbum(data);
      } catch (error) {
        console.error("Failed to fetch album:", error.message); // Log any errors
      }
    };

    fetchAlbum();
  }, [id, setAlbum]);
};

export default useFetchAlbum;
