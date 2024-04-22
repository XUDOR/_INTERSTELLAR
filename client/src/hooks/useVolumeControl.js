import { useState, useCallback, useEffect } from 'react';

export const useVolumeControl = (audioRef, initialVolume = 0.9) => {
    const [volume, setVolume] = useState(initialVolume);

    const handleVolumeChange = useCallback((event) => {
        const newVolume = event.target.value;
        const numericVolume = parseFloat(newVolume);
        if (Number.isFinite(numericVolume) && numericVolume >= 0 && numericVolume <= 1) {
            setVolume(numericVolume);
            if (audioRef.current) {
                audioRef.current.volume = numericVolume;  
            } else {
                
            }
        } else {
        }
    }, [audioRef]);
    
    

    // Initial setup to ensure the correct volume is set when the component mounts
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = initialVolume;
        }
    }, [audioRef, initialVolume]);
    return { volume, handleVolumeChange };
};
