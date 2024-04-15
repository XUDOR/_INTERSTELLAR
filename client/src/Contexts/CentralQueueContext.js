import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Exporting context directly for usage in other components
export const CentralQueueContext = createContext();

const initialState = {
  queue: [], // Includes detailed song info such as {albumId, localIndex, name, audioUrl}
  currentSongIndex: 0,
  isLoading: false,
  error: null
};

const queueReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUEUE':
      return { ...state, queue: action.payload, isLoading: false };
    case 'SET_CURRENT_SONG_INDEX':
      return { ...state, currentSongIndex: action.index };
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'ERROR':
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};

export const CentralQueueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queueReducer, initialState);

  const setSongByAlbumAndIndex = (albumId, localIndex) => {
    // Find the song in the queue using both albumId and localIndex
    const songIndex = state.queue.findIndex(song =>
      song.albumId === albumId && song.localIndex === localIndex);
    if (songIndex !== -1) {
      dispatch({ type: 'SET_CURRENT_SONG_INDEX', index: songIndex });
    } else {
      console.error('Song not found in queue');
    }
  };

  useEffect(() => {
    dispatch({ type: 'LOADING' });
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/songs');
        const data = await response.json();
        dispatch({ type: 'SET_QUEUE', payload: data.map((song, index) => ({
          ...song,
          localIndex: index + 1  // Assign localIndex starting from 1 for each song
        }))});
      } catch (error) {
        dispatch({ type: 'ERROR', error: error.toString() });
      }
    };
    fetchSongs();
  }, []);

  return (
    <CentralQueueContext.Provider value={{
      ...state,
      setSongByAlbumAndIndex
    }}>
      {children}
    </CentralQueueContext.Provider>
  );
};

// Custom hook for easy context usage
export const useCentralQueue = () => useContext(CentralQueueContext);
