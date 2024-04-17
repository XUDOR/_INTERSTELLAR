import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const MusicDataContext = createContext();

const initialState = {
  albumIndex: {}, // Albums stored by ID
  songIndex: {},  // Songs stored by Album ID
  queue: [],
  currentSongIndex: 0,
  repeat: false,
  isLoading: false,
  activeTab: null,
  error: null,
};

// Reducer function to handle actions
const musicDataReducer = (state, action) => {

  switch (action.type) {
    case 'FETCH_START':

      return { ...state, isLoading: true, error: null };
    case 'FETCH_ALBUMS_SUCCESS':
      const albumsById = action.payload.reduce((obj, album) => {
        obj[album.id] = album;
        return obj;
      }, {});

      return { ...state, albumIndex: albumsById, isLoading: false };
    case 'FETCH_SONGS_SUCCESS':
      const { albumId, songs } = action.payload;

      return {
        ...state,
        songIndex: { ...state.songIndex, [albumId]: songs },
        isLoading: false
      };
    case 'SET_QUEUE':

      return { ...state, queue: action.payload, currentSongIndex: 0 };
    case 'NEXT_SONG':
      let nextIndex = (state.currentSongIndex + 1) % state.queue.length;

      return { ...state, currentSongIndex: nextIndex };
    case 'PREV_SONG':
      let prevIndex = (state.currentSongIndex - 1 + state.queue.length) % state.queue.length;

      return { ...state, currentSongIndex: prevIndex };
    case 'FETCH_FAILURE':

      return { ...state, isLoading: false, error: action.payload };
    default:

      return state;
  }
};

// Custom hook to use music data reducer
export const useMusicDataReducer = () => {
  const [state, dispatch] = useReducer(musicDataReducer, initialState);
  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/albums');
        const albums = await response.data;
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: albums });

        // Fetch songs for each album and dispatch them
        for (const album of albums) {
          
          const response = await axios.get(`/api/songs/album/${album.id}`);
          const songs = await response.data;


          dispatch({ type: 'FETCH_SONGS_SUCCESS', payload: { albumId: album.id, songs } });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: 'FETCH_FAILURE', payload: error.toString() });
      }
    };

    fetchData();
  }, []);

  return { state, dispatch };
};

// Context provider component
export const MusicDataProvider = ({ children }) => {
  const { state, dispatch } = useMusicDataReducer();

  return (
    <MusicDataContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicDataContext.Provider>
  );
};

// Hook to use music data context
export const useMusicData = () => useContext(MusicDataContext);
export { MusicDataContext };
