import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CentralQueueContext = createContext();

const initialState = {
  queue: [],
  currentIndexID: null, // This represents the current song's indexID
  currentSongIndex: 0, 
  isLoading: false,
  error: null
};

// Reducer to handle actions related to queue management
const queueReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUEUE':
      return { ...state, queue: action.payload, isLoading: false };
    case 'SET_CURRENT_INDEX_ID':
      return { ...state, currentIndexID: action.indexID };
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

// Provider component
export const CentralQueueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queueReducer, initialState);

  // Actions wrapped in functions for easier use in components
  const setIndexID = (indexID) => dispatch({ type: 'SET_CURRENT_INDEX_ID', indexID });
  const setCurrentSongIndex = (index) => dispatch({ type: 'SET_CURRENT_SONG_INDEX', index });
  const setQueue = (queue) => dispatch({ type: 'SET_QUEUE', payload: queue });
  const goToNextSong = () => {
    // Increment currentSongIndex, wrap around if at the end
    const nextIndex = (state.currentSongIndex + 1) % state.queue.length;
    dispatch({ type: 'SET_CURRENT_SONG_INDEX', index: nextIndex });
  };
  const goToPreviousSong = () => {
    // Decrement currentSongIndex, wrap around if at the start
    const prevIndex = (state.currentSongIndex - 1 + state.queue.length) % state.queue.length;
    dispatch({ type: 'SET_CURRENT_SONG_INDEX', index: prevIndex });
  };

  // Effect to fetch the initial song queue
  useEffect(() => {
    dispatch({ type: 'LOADING' });
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/songs');
        const data = await response.json();
        dispatch({ type: 'SET_QUEUE', payload: data });
      } catch (error) {
        dispatch({ type: 'ERROR', error: error.toString() });
      }
    };
    fetchSongs();
  }, []);

  return (
    <CentralQueueContext.Provider value={{
      ...state,
      setIndexID,
      setCurrentSongIndex,
      setQueue,
      goToNextSong,
      goToPreviousSong
    }}>
      {children}
    </CentralQueueContext.Provider>
  );
};

// Custom hook to use the CentralQueueContext
export const useCentralQueue = () => useContext(CentralQueueContext);

export { CentralQueueContext };
