import React, { createContext, useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const CentralQueueContext = createContext();

const initialState = {
    queue: [],
    originalQueue: [],
    currentSongIndex: 0,
    isLoading: false,
    showFavorites: false,
    error: null
};

const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const queueReducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUEUE':
            return {
                ...state,
                queue: action.payload,
                originalQueue: state.originalQueue.length === 0 ? action.payload : state.originalQueue,
                isLoading: false
            };
        case 'ADD_SONGS':
            return { ...state, queue: [...state.queue, ...action.payload] };
        case 'SET_CURRENT_SONG_INDEX':
            return { ...state, currentSongIndex: action.index };
        case 'SET_CURRENT_SONG_BY_ID':
            const songIndex = state.queue.findIndex(song => song.id === action.id);
            return { ...state, currentSongIndex: songIndex !== -1 ? songIndex : state.currentSongIndex };
        case 'CLEAR_QUEUE':
            return { ...state, queue: [], currentSongIndex: 0 };
        case 'RELOAD_QUEUE':
            return { ...state, queue: action.payload, isLoading: false };
        case 'SHUFFLE_QUEUE':
            return { ...state, queue: shuffleArray(state.queue) };
        case 'RESET_QUEUE':
            return { ...state, queue: [...state.originalQueue], currentSongIndex: 0 };
        case 'TOGGLE_SHOW_FAVORITES':
            return { ...state, showFavorites: !state.showFavorites };
        case 'TOGGLE_FAVORITE':
            const updatedQueue = state.queue.map((song) =>
                song.id === action.id ? { ...song, isFavorite: !song.isFavorite } : song
            );
            Cookies.set('favorites', JSON.stringify(updatedQueue.filter(song => song.isFavorite)));
            return { ...state, queue: updatedQueue };
        case 'SET_FAVORITES':
            return { 
                ...state, 
                queue: state.queue.map(song => ({
                    ...song,
                    isFavorite: action.payload.includes(song.id)
                }))
            };
        case 'FILTER_BY_ALBUM':
            return { ...state, queue: state.queue.filter(song => song.album === action.albumName) };
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

    const fetchSongs = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await axios.get('/api/songs');
            const songs = await response.data;
            const queueWithGlobalIndex = songs.map((song, index) => ({ ...song, globalIndex: index, isFavorite: false }));
            dispatch({ type: 'SET_QUEUE', payload: queueWithGlobalIndex });
        } catch (error) {
            dispatch({ type: 'ERROR', error: error.toString() });
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    useEffect(() => {
        const savedFavorites = Cookies.get('favorites');
        if (savedFavorites) {
            const favoriteIds = JSON.parse(savedFavorites).map(fav => fav.id);
            dispatch({ type: 'SET_FAVORITES', payload: favoriteIds });
        }
    }, []);

    const setCurrentSongIndex = (index) => dispatch({ type: 'SET_CURRENT_SONG_INDEX', index });
    const setCurrentSongById = (id) => dispatch({ type: 'SET_CURRENT_SONG_BY_ID', id });
    const clearQueue = () => dispatch({ type: 'CLEAR_QUEUE' });
    const addSongs = (songs) => dispatch({ type: 'ADD_SONGS', payload: songs });
    const shuffleQueue = () => dispatch({ type: 'SHUFFLE_QUEUE' });
    const resetQueue = () => dispatch({ type: 'RESET_QUEUE' });
    const toggleFavorite = (id) => dispatch({ type: 'TOGGLE_FAVORITE', id });
    const toggleShowFavorites = () => dispatch({ type: 'TOGGLE_SHOW_FAVORITES' });
    const filterByAlbum = (albumName) => dispatch({ type: 'FILTER_BY_ALBUM', albumName });
    const setQueue = (queue) => dispatch({ type: 'SET_QUEUE', payload: queue });

    return (
        <CentralQueueContext.Provider value={{
            ...state,
            setCurrentSongIndex,
            setCurrentSongById,
            clearQueue,
            addSongs,
            shuffleQueue,
            toggleFavorite,
            filterByAlbum,
            resetQueue,
            toggleShowFavorites,
            setQueue
        }}>
            {children}
        </CentralQueueContext.Provider>
    );
};

export const useCentralQueue = () => useContext(CentralQueueContext);
