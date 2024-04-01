import React, { createContext, useContext, useState, useEffect } from 'react';

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [albumIndex, setAlbumIndex] = useState({});
  const [songIndex, setSongIndex] = useState({});
  const [albumDetails, setAlbumDetails] = useState({}); // State for detailed album information

  useEffect(() => {
    // Fetch album data
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/albums');
        if (!response.ok) throw new Error('Failed to fetch albums');
        const albums = await response.json();
        setAlbumIndex(albums.reduce((acc, album) => {
          acc[album.id] = album;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    // Fetch song data
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/songs');
        if (!response.ok) throw new Error('Failed to fetch songs');
        const songs = await response.json();
        setSongIndex(songs.reduce((acc, song) => {
          acc[song.id] = song;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchAlbums();
    fetchSongs();
  }, []);

  // Function to update detailed information for a specific album
  const updateAlbumDetails = (albumId, details) => {
    setAlbumDetails(prevDetails => ({
      ...prevDetails,
      [albumId]: details,
    }));
  };

  return (
    <MusicDataContext.Provider value={{ albumIndex, songIndex, albumDetails, updateAlbumDetails }}>
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
