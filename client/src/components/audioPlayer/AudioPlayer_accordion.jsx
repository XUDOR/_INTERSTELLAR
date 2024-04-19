/*
code for expandable acordion for the player /// good for small viewports
import React, { useState, useEffect, useRef, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import './AudioPlayer.css';

const AudioPlayer = () => {
    const { queue, currentSongIndex, setCurrentSongIndex } = useContext(CentralQueueContext);
    const [isExpanded, setIsExpanded] = useState(false);  // State to control expansion
    const [isPlaying, setIsPlaying] = useState(false);
    // other states and refs

    const togglePlayer = () => {
        setIsExpanded(!isExpanded);
    };

    // Existing useEffects and functions

    return (
        <div className={`player ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button onClick={togglePlayer}>Toggle Player</button>
            {isExpanded && (
                // All your player controls and displays go here
            )}
        </div>
    );
};

export default AudioPlayer;

-----------css

.player.collapsed {
    max-height: 20px; // Set a small height or even 0 based on your design
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.player.expanded {
    max-height: 500px; // Adjust based on the content
    transition: max-height 0.3s ease-in;
}


*/ 