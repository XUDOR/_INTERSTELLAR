import { useReducer, useEffect } from 'react';

const initialState = {
  albumIndex: {},
  songIndex: {},
  isLoading: false,
  error: null,
};

const musicDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_ALBUMS_SUCCESS':
      // Assuming albums payload is an array of album objects
      const albumIndex = action.payload.reduce((acc, album) => {
        // Ensuring album.id is a string for consistency
        acc[String(album.id)] = album;
        return acc;
      }, {});
      return { ...state, albumIndex, isLoading: false };
    case 'FETCH_SONGS_SUCCESS':
      // Transform fetched songs into a structure organized by album_id
      const songsByAlbum = action.payload.reduce((acc, song) => {
        // Ensure album_id is treated as a string to match albumId keys
        const albumIdStr = String(song.album_id);
        if (!acc[albumIdStr]) {
          acc[albumIdStr] = [];
        }
        acc[albumIdStr].push(song);
        return acc;
      }, {});
      console.log("Transformed songsByAlbum in reducer:", songsByAlbum); // Logging for debugging
      return { ...state, songIndex: songsByAlbum, isLoading: false };
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
        // Ensure correct endpoints and handle any API base URL changes accordingly
        const albumRes = await fetch('/api/albums');
        if (!albumRes.ok) throw new Error('Failed to fetch albums');
        const albums = await albumRes.json();
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: albums });

        const songRes = await fetch('/api/songs');
        if (!songRes.ok) throw new Error('Failed to fetch songs');
        const songs = await songRes.json();
        console.log("Fetched songs before dispatching:", songs); // Logging fetched songs for debugging
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
