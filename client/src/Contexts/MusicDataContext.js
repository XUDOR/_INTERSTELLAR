// MusicDataContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [albumIndex, setAlbumIndex] = useState({});
  const [songIndex, setSongIndex] = useState({});
  const [albumDetails, setAlbumDetails] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(`Fetching Data: isDataFetched=${isDataFetched}`);
      if (!isDataFetched) {
        console.log('Initiating fetch for albums and songs');
        try {
          const albumResponse = await fetch('http://localhost:5001/api/albums');
          const songResponse = await fetch('http://localhost:5001/api/songs');
          console.log('Album and Song responses fetched');

          if (!albumResponse.ok) throw new Error('Failed to fetch albums');
          if (!songResponse.ok) throw new Error('Failed to fetch songs');

          const albums = await albumResponse.json();
          const songs = await songResponse.json();
          console.log('Albums and songs converted to JSON');

          // Update state with fetched data
          setAlbumIndex(albums.reduce((acc, album) => {
            acc[album.id] = album;
            return acc;
          }, {}));
          console.log('Updated albumIndex state with fetched albums');

          setSongIndex(songs.reduce((acc, song) => {
            acc[song.id] = song;
            return acc;
          }, {}));
          console.log('Updated songIndex state with fetched songs');

          console.log('Albums and songs fetched successfully');
          setIsDataFetched(true); // Indicate that data has been successfully fetched
          console.log('Set isDataFetched to true');
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [isDataFetched]);

  const updateAlbumDetails = (albumId, details) => {
    console.log(`Updating details for albumId ${albumId}`);
    setAlbumDetails(prevDetails => {
      const updatedDetails = { ...prevDetails, [albumId]: details };
      console.log('Updated albumDetails state', updatedDetails);
      return updatedDetails;
    });
  };

  useEffect(() => {
    console.log('State changes detected:');
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
