// MusicDataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [albumIndex, setAlbumIndex] = useState({});
  const [songIndex, setSongIndex] = useState({});
  // Placeholder for future playlist index
  // const [playListIndex, setPlayListIndex] = useState({});

  // Fetch data from the backend and populate the indexes
  useEffect(() => {
    // Placeholder for fetch function
    const fetchData = async () => {
      // Fetch albums and songs, then set indexes
      // setAlbumIndex(fetchedAlbums);
      // setSongIndex(fetchedSongs);
    };

    fetchData();
  }, []);

  return (
    <MusicDataContext.Provider value={{ albumIndex, songIndex }}>
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
  