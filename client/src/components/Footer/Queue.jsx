import React, { useState, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext'; // Adjust the import path as necessary
import './Queue.css';

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false); // State to manage the visibility of the queue
    const { queue, currentSongIndex, setCurrentSongIndex } = useContext(CentralQueueContext);

    // Function to toggle the visibility of the queue
    const toggleQueue = () => {
        setIsExpanded(!isExpanded);
    };

    // Function to handle clicking on a song in the queue
    const handleSongClick = (index) => {
        setCurrentSongIndex(index);
    };

    return (
        <div className={`Queue ${isExpanded ? 'expanded' : ''}`} onClick={toggleQueue}>
            <div className="QueueTitle">Queue</div>
            {isExpanded && (
                <div className="QueueItems">
                    {queue.length > 0 ? (
                        queue.map((song, index) => (
                            <div 
                                key={index} 
                                className={`QueueItem ${index === currentSongIndex ? 'highlight' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents the Queue from toggling when clicking on an item
                                    handleSongClick(index);
                                }}
                            >
                                {song.name}
                            </div>
                        ))
                    ) : (
                        <div className="QueueItem">No songs in queue.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Queue;
