import { useState, useCallback, useEffect } from 'react';

export const useVolumeControl = (audioRef, initialVolume = 0.9) => {
    const [volume, setVolume] = useState(initialVolume);
    const [isMuted, setIsMuted] = useState(false);

    const handleVolumeChange = useCallback((newVolume) => {
        const numericVolume = parseFloat(newVolume);
        if (Number.isFinite(numericVolume) && numericVolume >= 0 && numericVolume <= 1) {
            setVolume(numericVolume);
            setIsMuted(false); // Unmute when volume is adjusted
            if (audioRef.current) {
                audioRef.current.volume = numericVolume;
            }
        }
    }, [audioRef]);

    const toggleMute = useCallback(() => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.volume = !isMuted ? 0 : volume;  // Ensure to switch logic to restore volume correctly
        }
    }, [audioRef, isMuted, volume]);
    

    // Initialize the volume when the component mounts
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = initialVolume;
        }
    }, [audioRef, initialVolume]);

    return { volume, handleVolumeChange, toggleMute, isMuted };
};
