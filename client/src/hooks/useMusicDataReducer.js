import { useReducer, useEffect } from 'react';

// Initial state setup
const initialState = {
  albumIndex: {},
  songIndex: {},
  isLoading: false,
  activeTab: null,
  error: null, // Add an error state to handle fetch errors
};

// Reducer function
const musicDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START': return { ...state, isLoading: true, error: null };
    case 'FETCH_ALBUMS_SUCCESS': return { ...state, albumIndex: action.payload, isLoading: false };
    case 'FETCH_SONGS_SUCCESS': return { ...state, songIndex: action.payload, isLoading: false };
    case 'SET_ACTIVE_TAB': return { ...state, activeTab: action.payload };
    case 'FETCH_FAILURE': return { ...state, isLoading: false, error: action.payload };
    default: return state;
  }
};

// Custom hook to manage and fetch music data
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
        
        // Transform and dispatch the fetched data
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: albums });
        dispatch({ type: 'FETCH_SONGS_SUCCESS', payload: songs });
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: 'FETCH_FAILURE', payload: error.toString() });
      }
    };

    fetchData();
  }, []);

  return [state, dispatch];
};
