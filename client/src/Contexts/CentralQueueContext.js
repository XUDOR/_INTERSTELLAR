import axios from 'axios';
import React, { createContext, useReducer, useEffect, useContext } from 'react';

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
            return { ...state, queue: state.queue.map((song, index) => index === action.index ? { ...song, isFavorite: !song.isFavorite } : song) };
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

    const setCurrentSongIndex = (index) => dispatch({ type: 'SET_CURRENT_SONG_INDEX', index });
    const clearQueue = () => dispatch({ type: 'CLEAR_QUEUE' });
    const addSongs = (songs) => dispatch({ type: 'ADD_SONGS', payload: songs });
    const shuffleQueue = () => dispatch({ type: 'SHUFFLE_QUEUE' });
    const resetQueue = () => dispatch({ type: 'RESET_QUEUE' });
    const toggleFavorite = (index) => dispatch({ type: 'TOGGLE_FAVORITE', index });
    const toggleShowFavorites = () => dispatch({ type: 'TOGGLE_SHOW_FAVORITES' });
    const filterByAlbum = (albumName) => dispatch({ type: 'FILTER_BY_ALBUM', albumName });

    return (
        <CentralQueueContext.Provider value={{ ...state, setCurrentSongIndex, clearQueue, addSongs, shuffleQueue, toggleFavorite, filterByAlbum, resetQueue, toggleShowFavorites }}>
            {children}
        </CentralQueueContext.Provider>
    );
};

export const useCentralQueue = () => useContext(CentralQueueContext);
