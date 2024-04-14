import { useReducer, useEffect } from 'react';

const initialState = {
  albumIndex: {},
  songIndex: {},
  queue: [],
  currentSongIndex: 0,
  isLoading: false,
  error: null
};

const musicDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true };

    case 'FETCH_ALBUMS_SUCCESS':
      const albumsById = action.payload.reduce((obj, album) => {
        obj[album.id] = album;
        return obj;
      }, {});
      return { ...state, albumIndex: albumsById, isLoading: false };

    case 'FETCH_SONGS_SUCCESS':
      const songsByAlbum = action.payload.reduce((acc, song) => {
        const albumId = String(song.album_id);
        if (!acc[albumId]) {
          acc[albumId] = [];
        }
        acc[albumId].push(song);
        return acc;
      }, {});
      const sortedSongs = Object.values(songsByAlbum).flat().sort((a, b) => a.indexID - b.indexID);
      return { ...state, songIndex: songsByAlbum, queue: sortedSongs, isLoading: false };

    case 'NEXT_SONG':
      const nextIndex = (state.currentSongIndex + 1) % state.queue.length;
      return { ...state, currentSongIndex: nextIndex };

    case 'PREV_SONG':
      const prevIndex = (state.currentSongIndex - 1 + state.queue.length) % state.queue.length;
      return { ...state, currentSongIndex: prevIndex };



    case 'FETCH_FAILURE':
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export const useMusicDataReducer = () => {
  const [state, dispatch] = useReducer(musicDataReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    async function fetchData() {
      try {
        const albumRes = await fetch('/api/albums');
        const albums = await albumRes.json();
        dispatch({ type: 'FETCH_ALBUMS_SUCCESS', payload: albums });

        const songRes = await fetch('/api/songs');
        const songs = await songRes.json();
        dispatch({ type: 'FETCH_SONGS_SUCCESS', payload: songs });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: error.toString() });
      }
    }
    fetchData();
  }, []);

  return [state, dispatch];
};
