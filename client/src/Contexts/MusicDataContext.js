import React, { createContext, useContext, useState, useEffect } from 'react';

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [albumIndex, setAlbumIndex] = useState({});
  const [songIndex, setSongIndex] = useState({});
  const [albumDetails, setAlbumDetails] = useState({}); // State for detailed album information

  useEffect(() => {
    // Fetch album data
    const fetchAlbums = async () => {
      console.log('Initiating fetch for albums');
      try {
        const response = await fetch('http://localhost:5001/api/albums');
        console.log('Response received for albums', response);
        if (!response.ok) throw new Error('Failed to fetch albums');
        const albums = await response.json();
        console.log('Albums fetched successfully', albums);
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
      console.log('Initiating fetch for songs');
      try {
        const response = await fetch('http://localhost:5001/api/songs');
        console.log('Response received for songs', response);
        if (!response.ok) throw new Error('Failed to fetch songs');
        const songs = await response.json();
        console.log('Songs fetched successfully', songs);
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
    console.log(`Updating details for albumId ${albumId}`);
    setAlbumDetails(prevDetails => ({
      ...prevDetails,
      [albumId]: details,
    }));
  };

  // Logs to see the current state
  useEffect(() => {
    console.log('Current albumIndex:', albumIndex);
    console.log('Current songIndex:', songIndex);
    console.log('Current albumDetails:', albumDetails);
  }, [albumIndex, songIndex, albumDetails]);

  return (
    <MusicDataContext.Provider value={{ albumIndex, songIndex, albumDetails, updateAlbumDetails }}>
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
