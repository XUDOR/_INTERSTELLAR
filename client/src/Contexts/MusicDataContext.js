// MusicDataContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [albumIndex, setAlbumIndex] = useState({});
  const [songIndex, setSongIndex] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const albumResponse = await fetch('http://localhost:5001/api/albums');
      const songResponse = await fetch('http://localhost:5001/api/songs');
      if (!albumResponse.ok || !songResponse.ok) throw new Error('Failed to fetch data');
      const albums = await albumResponse.json();
      const songs = await songResponse.json();
      
      const transformedAlbums = albums.reduce((acc, album) => {
        acc[album.id] = {
          ...album,
          catalogueData: {
            catalogue: album.catalogue,
            description: album.description,
            credit: album.credit,
          },
        };
        return acc;
      }, {});
      
      setAlbumIndex(transformedAlbums);
      setSongIndex(songs.reduce((acc, song) => ({ ...acc, [song.id]: song }), {}));
      setActiveTab(Object.keys(albums)[0]); // Set default activeTab to the first album
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MusicDataContext.Provider value={{
      albumIndex, 
      songIndex, 
      isLoading, 
      activeTab, 
      setActiveTab,
    }}>
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
