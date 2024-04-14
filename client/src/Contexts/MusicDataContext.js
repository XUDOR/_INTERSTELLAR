import React, { createContext, useContext, useReducer, useEffect } from 'react';

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
  console.log("Received action:", action.type, action); // Log every action received
  switch (action.type) {
    case 'FETCH_START':
      console.log("Fetching data started");
      return { ...state, isLoading: true, error: null };
    case 'FETCH_ALBUMS_SUCCESS':
      const albumsById = action.payload.reduce((obj, album) => {
        obj[album.id] = album;
        return obj;
      }, {});
      console.log("Fetched albums successfully:", albumsById);
      return { ...state, albumIndex: albumsById, isLoading: false };
    case 'FETCH_SONGS_SUCCESS':
      const { albumId, songs } = action.payload;
      console.log(`Fetched songs successfully for album ID ${albumId}:`, songs);
      return {
        ...state,
        songIndex: { ...state.songIndex, [albumId]: songs },
        isLoading: false
      };
    case 'SET_QUEUE':
      console.log("Queue set:", action.payload);
      return { ...state, queue: action.payload, currentSongIndex: 0 };
    case 'NEXT_SONG':
      let nextIndex = (state.currentSongIndex + 1) % state.queue.length;
      console.log("Moved to next song, index:", nextIndex);
      return { ...state, currentSongIndex: nextIndex };
    case 'PREV_SONG':
      let prevIndex = (state.currentSongIndex - 1 + state.queue.length) % state.queue.length;
      console.log("Moved to previous song, index:", prevIndex);
      return { ...state, currentSongIndex: prevIndex };
    case 'FETCH_FAILURE':
      console.log("Failed to fetch data:", action.payload);
      return { ...state, isLoading: false, error: action.payload };
    default:
      console.log("Unhandled action:", action);
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
        const albumRes = await fetch('http://localhost:5001/api/albums');
        if (!albumRes.ok) throw new Error('Failed to fetch albums');
        const albums = await albumRes.json();
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: albums });

        // Fetch songs for each album and dispatch them
        for (const album of albums) {
          const songRes = await fetch(`http://localhost:5001/api/songs/album/${album.id}`);
          if (!songRes.ok) throw new Error(`Failed to fetch songs for album ID ${album.id}`);
          const songs = await songRes.json();
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
