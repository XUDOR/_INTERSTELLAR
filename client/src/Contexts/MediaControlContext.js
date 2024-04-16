// MediaControlContext.js
import React, { createContext, useContext, useState } from 'react';

const MediaControlContext = createContext();

export const MediaControlProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
        setIsPlaying(true);
    };

    const pause = () => {
        setIsPlaying(false);
    };

    return (
        <MediaControlContext.Provider value={{ isPlaying, play, pause }}>
            {children}
        </MediaControlContext.Provider>
    );
};

export const useMediaControl = () => useContext(MediaControlContext);
