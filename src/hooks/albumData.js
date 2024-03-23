// ALBUM DATA HOOK-start


import { useState, useEffect } from 'react';

const useAlbumData = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      // Example API call
      const response = await fetch('https://api.example.com/albums');
      const data = await response.json();
      setAlbums(data.map(album => ({
        ...album,
        imageUrl: album.imageUrl // Or modify this to adapt to new URL structure
      })));
    };

    fetchAlbums();
  }, []);

  return albums;
};
