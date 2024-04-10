import { useReducer, useEffect } from 'react';

const initialState = {
  // Initial state setup
};

const musicDataReducer = (state, action) => {
  // Reducer logic
  switch (action.type) {
    // Case logic
    case 'FETCH_SONGS_SUCCESS': 
      const songsByAlbum = action.payload.reduce((acc, song) => {
        // Transformation logic
      }, {});
      console.log("Transformed songsByAlbum in reducer:", songsByAlbum); // Log after transformation
      return { ...state, songIndex: songsByAlbum, isLoading: false };
    // Other cases
  }
};

export const useMusicDataReducer = () => {
  const [state, dispatch] = useReducer(musicDataReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        // Fetching logic
        console.log("Fetched songs before dispatching:", songs); // Log fetched songs
        // Dispatching FETCH_SONGS_SUCCESS
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: 'FETCH_FAILURE', payload: error.toString() });
      }
    };

    fetchData();
  }, []);

  return [state, dispatch];
};
