// useTrackProgress.js

import { useState, useEffect, useCallback } from 'react';

export const useTrackProgress = (audioRef) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    const skipTime = useCallback((time) => {
        if (audioRef.current) {
            audioRef.current.currentTime += time;
            setCurrentTime(audioRef.current.currentTime);
        }
    }, []);

    useEffect(() => {
        const player = audioRef.current;
        if (!player) return;

        const updateProgress = () => {
            if (!isSeeking) setCurrentTime(player.currentTime);
        };

        const updateDuration = () => setDuration(player.duration);

        player.addEventListener('timeupdate', updateProgress);
        player.addEventListener('loadedmetadata', updateDuration);

        return () => {
            player.removeEventListener('timeupdate', updateProgress);
            player.removeEventListener('loadedmetadata', updateDuration);
        };
    }, [audioRef, isSeeking]);

    return { currentTime, duration, setCurrentTime, setIsSeeking, skipTime };
};
