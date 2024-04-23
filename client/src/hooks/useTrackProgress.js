// useTrackProgress.js
import { useState, useEffect, useCallback } from 'react';

export const useTrackProgress = (audioRef) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    const seek = useCallback((time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, [audioRef]);

    useEffect(() => {
        const player = audioRef.current;
        if (!player) return;

        const updateProgress = () => setCurrentTime(player.currentTime);
        const updateDuration = () => setDuration(player.duration);

        player.addEventListener('timeupdate', updateProgress);
        player.addEventListener('durationchange', updateDuration);

        return () => {
            player.removeEventListener('timeupdate', updateProgress);
            player.removeEventListener('durationchange', updateDuration);
        };
    }, [audioRef]);

    return { currentTime, duration, seek, setIsSeeking };
};
