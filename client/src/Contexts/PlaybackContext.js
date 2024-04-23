import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CentralQueueContext } from './CentralQueueContext'; // Adjust the import path as necessary

export const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [volume, setVolume] = useState(0.75);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(180); // Default duration set as a number

    const { queue } = useContext(CentralQueueContext);

    const play = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const playNext = useCallback((increment = 1) => {
        let nextIndex = (currentTrackIndex + increment + queue.length) % queue.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    }, [currentTrackIndex, queue.length]);

    const toggleAutoplay = useCallback(() => {
        setAutoplay(prev => !prev);
    }, []);

    const toggleRepeat = useCallback(() => {
        setRepeat(prev => !prev);
    }, []);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
        setVolume(prev => (prev > 0 ? 0 : 0.75));
    }, []);

    const handleVolumeChange = useCallback((newVolume) => {
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }, []);

    const seek = useCallback((time) => {
        setCurrentTime(time);
    }, []);

    useEffect(() => {
        if (queue.length > 0 && queue[currentTrackIndex]) {
            const newDuration = Number(queue[currentTrackIndex].duration) || 180;
            setDuration(newDuration);
            setCurrentTime(0); // Reset current time when track changes
        }
    }, [currentTrackIndex, queue]);

    useEffect(() => {
        if (isPlaying && queue[currentTrackIndex]) {
            const timer = setTimeout(() => {
                playNext(); // Automatically play next when timeout expires
            }, duration * 1000); // duration in seconds
            return () => clearTimeout(timer);
        }
    }, [isPlaying, currentTrackIndex, duration, queue, playNext]);

    return (
        <PlaybackContext.Provider value={{
            isPlaying,
            currentTrackIndex,
            tracks: queue,
            repeat,
            autoplay,
            volume,
            isMuted,
            currentTime,
            duration,
            play,
            pause,
            playNext,
            toggleAutoplay,
            toggleRepeat,
            toggleMute,
            handleVolumeChange,
            seek
        }}>
            {children}
        </PlaybackContext.Provider>
    );
};

export const usePlayback = () => useContext(PlaybackContext);
