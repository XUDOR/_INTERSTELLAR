// MusicDataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [albumIndex, setAlbumIndex] = useState({});
  const [songIndex, setSongIndex] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For global loading state
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await fetch('http://localhost:5001/api/albums');
        const songResponse = await fetch('http://localhost:5001/api/songs');
        if (!albumResponse.ok || !songResponse.ok) throw new Error('Failed to fetch data');
        const albums = await albumResponse.json();
        const songs = await songResponse.json();
        setAlbumIndex(albums.reduce((acc, album) => ({ ...acc, [album.id]: album }), {}));
        setSongIndex(songs.reduce((acc, song) => ({ ...acc, [song.id]: song }), {}));
        setActiveTab(Object.keys(albums)[0]); // Set default activeTab to first album
        setIsDataFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Data fetched, loading complete
      }
    };
    fetchData();
  }, []);

  return (
    <MusicDataContext.Provider value={{ albumIndex, songIndex, isDataFetched, activeTab, setActiveTab, isLoading }}>
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
