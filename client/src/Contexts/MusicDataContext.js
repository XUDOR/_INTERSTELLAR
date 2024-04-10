// src/contexts/MusicDataContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MusicDataContext = createContext();

const initialState = {
  albumIndex: {},
  songIndex: {},
  isLoading: false,
  activeTab: null,
  error: null,
};

const musicDataReducer = (state, action) => {
  console.log(action); // For debugging
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_ALBUMS_SUCCESS':
      const albumsById = action.payload.reduce((obj, album) => ({
        ...obj,
        [album.id]: album,
      }), {});
      return { ...state, albumIndex: albumsById, isLoading: false };
    case 'FETCH_SONGS_SUCCESS':
      const songsById = action.payload.reduce((obj, song) => ({
        ...obj,
        [song.id]: song,
      }), {});
      return { ...state, songIndex: songsById, isLoading: false };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const useMusicDataReducer = () => {
  const [state, dispatch] = useReducer(musicDataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const albumRes = await fetch('http://localhost:5001/api/albums');
        const songRes = await fetch('http://localhost:5001/api/songs');
        if (!albumRes.ok || !songRes.ok) throw new Error('Failed to fetch data');
        
        const albums = await albumRes.json();
        const songs = await songRes.json();
        
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: albums });
        dispatch({ type: 'FETCH_SONGS_SUCCESS', payload: songs });
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: 'FETCH_FAILURE', payload: error.toString() });
      }
    };

    fetchData();
  }, []);

  return { state, dispatch };
};

export const MusicDataProvider = ({ children }) => {
  const context = useMusicDataReducer();

  return (
    <MusicDataContext.Provider value={context}>
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
