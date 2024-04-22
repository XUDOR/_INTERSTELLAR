import { useCallback, useRef, useState, useEffect } from 'react';

export const useAudioControl = (initialIsPlaying = false, autoPlay = true) => {
    const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
    const audioRef = useRef(null);

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error("Error during playback:", error);
                setIsPlaying(false); // Set isPlaying to false if there's an error.
            });
        }
    }, []);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }, []);

    const togglePlayback = useCallback(() => {
        if (!audioRef.current) return;
        isPlaying ? pause() : play();
        setIsPlaying(!isPlaying);
    }, [isPlaying, play, pause]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleLoadedData = () => {
            if (autoPlay && !isPlaying) {
                play();  // Play automatically when data is loaded if autoplay is true
            }
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('loadeddata', handleLoadedData);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('loadeddata', handleLoadedData);
        };
    }, [autoPlay, isPlaying, play]);

    return { isPlaying, togglePlayback, audioRef, play, pause };
};
