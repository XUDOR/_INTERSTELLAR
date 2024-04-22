// useVolumeControl.js

import { useState, useCallback } from 'react';

export const useVolumeControl = (audioRef, initialVolume = 0.9) => {
    const [volume, setVolume] = useState(initialVolume);

    const handleVolumeChange = useCallback((newVolume) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    }, []);

    return { volume, handleVolumeChange };
};
