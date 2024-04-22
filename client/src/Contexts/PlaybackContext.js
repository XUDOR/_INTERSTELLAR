import React, { createContext, useContext, useState, useEffect } from 'react';

export const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [volume, setVolume] = useState(0.75);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(180); // Assuming 180 is a placeholder

    const tracks = ['Track 1', 'Track 2', 'Track 3']; // Placeholder tracks

    useEffect(() => {
        const handleTrackEnd = () => {
            if (repeat) {
                play(); // Restart current track if repeat is on
            } else if (autoplay) {
                playNext(); // Play next track if autoplay is on
            }
        };

        if (isPlaying) {
            console.log(`Playing ${tracks[currentTrackIndex]}`);
            setTimeout(handleTrackEnd, 3000); // Simulate a track ending after 3 seconds
        }
    }, [isPlaying, currentTrackIndex, repeat, autoplay, tracks]);

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    const playNext = () => {
        let nextIndex = currentTrackIndex + 1;
        if (nextIndex >= tracks.length) {
            nextIndex = repeat ? 0 : currentTrackIndex;
        }
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    };
    const toggleAutoplay = () => setAutoplay(!autoplay);
    const toggleRepeat = () => setRepeat(!repeat);
    const toggleMute = () => {
        setIsMuted(!isMuted);
        setVolume(isMuted ? 0.75 : 0);
    };
    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };
    const seek = (time) => {
        setCurrentTime(time);
    };

    return (
        <PlaybackContext.Provider value={{
            play,
            pause,
            playNext,
            toggleAutoplay,
            toggleRepeat,
            isPlaying,
            currentTrackIndex,
            tracks,
            repeat,
            autoplay,
            volume,
            handleVolumeChange,
            toggleMute,
            isMuted,
            currentTime,
            duration,
            setDuration,
            seek
        }}>
            {children}
        </PlaybackContext.Provider>
    );
};

export const usePlayback = () => useContext(PlaybackContext);
