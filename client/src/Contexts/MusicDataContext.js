import React, { createContext, useContext, useState, useEffect } from 'react';

const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [albumIndex, setAlbumIndex] = useState({});
  const [songIndex, setSongIndex] = useState({});
  const [albumDetails, setAlbumDetails] = useState({}); // Added state for detailed album information

  useEffect(() => {
    const fetchData = async () => {
      // This is a placeholder for your actual fetch calls
      // Example: Fetch the album and song index from your API and set state
      // setAlbumIndex(fetchedAlbums);
      // setSongIndex(fetchedSongs);
    };

    fetchData();
  }, []);

  // Function to update detailed information for a specific album
  const updateAlbumDetails = (albumId, details) => {
    setAlbumDetails(prevDetails => ({
      ...prevDetails,
      [albumId]: details, // Update the specific album's details
    }));
  };

  return (
    <MusicDataContext.Provider value={{ albumIndex, songIndex, albumDetails, updateAlbumDetails }}>
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
