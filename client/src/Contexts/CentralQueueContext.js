// CentralQueueContext.js

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

  // Effect to fetch the initial song queue
  useEffect(() => {
    const fetchSongs = async () => {
      dispatch({ type: 'LOADING' });
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

  const setIndexID = (indexID) => {
    dispatch({ type: 'SET_CURRENT_INDEX_ID', indexID });
  };

  return (
    <CentralQueueContext.Provider value={{ ...state, setIndexID }}>
      {children}
    </CentralQueueContext.Provider>
  );
};

// Custom hook to use the CentralQueueContext
export const useCentralQueue = () => useContext(CentralQueueContext);

export { CentralQueueContext };
