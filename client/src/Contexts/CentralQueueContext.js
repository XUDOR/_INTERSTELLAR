import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Creating the context
export const CentralQueueContext = createContext();

const initialState = {
  queue: [], // This will include detailed song info with a global index starting from 1
  currentSongIndex: 0,
  isLoading: false,
  error: null
};

// Reducer to handle actions
const queueReducer = (state, action) => {
  console.log("Received action:", action); // Log every action received by the reducer
  switch (action.type) {
    case 'SET_QUEUE':
      console.log('Setting the entire queue:', action.payload); // Log the new queue being set
      return { ...state, queue: action.payload, isLoading: false };
    case 'SET_CURRENT_SONG_INDEX':
      console.log('Updating current song index to:', action.index); // Confirm the index is correct
      return { ...state, currentSongIndex: action.index };
    case 'LOADING':
      console.log('Setting loading state');
      return { ...state, isLoading: true };
    case 'ERROR':
      console.error('Error occurred:', action.error); // Log any errors
      return { ...state, error: action.error, isLoading: false };
    default:
      console.log('Handling default case with no specific action type');
      return state;
  }
};

// Context provider component
export const CentralQueueProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queueReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOADING' });
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/songs');
        const songs = await response.json();
        // Adjust the index here if needed, based on your app's requirements
        const queueWithGlobalIndex = songs.map((song, index) => ({ ...song, globalIndex: index })); // Zero-based index
        dispatch({ type: 'SET_QUEUE', payload: queueWithGlobalIndex });
        // Initialize currentSongIndex, e.g., set to start from the first song
        dispatch({ type: 'SET_CURRENT_SONG_INDEX', index: 0 });
      } catch (error) {
        dispatch({ type: 'ERROR', error: error.toString() });
      }
    };
    fetchSongs();
  }, []);

  const setCurrentSongIndex = (index) => {
    console.log(`Setting current song index to: ${index}`);
    dispatch({ type: 'SET_CURRENT_SONG_INDEX', index });
  };

  return (
    <CentralQueueContext.Provider value={{ ...state, setCurrentSongIndex }}>
      {children}
    </CentralQueueContext.Provider>
  );
};


// Hook to use this context
export const useCentralQueue = () => useContext(CentralQueueContext);
