import React, { useState, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import './Queue.css';

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { queue, currentSongIndex, setCurrentSongIndex } = useContext(CentralQueueContext);

    // Log the queue's state each time the component renders
    console.log("Queue loaded with current song index:", currentSongIndex);

    // Toggle the visibility of the queue
    const toggleQueue = () => {
        setIsExpanded(!isExpanded);
        console.log("Toggled queue visibility to:", !isExpanded);
    };

    // Handle clicking on a song in the queue
    const handleSongClick = (index) => {
        console.log("Attempting to set current song to index:", index); // Log which index is being attempted to set
        setCurrentSongIndex(index);
    };

    return (
        <div className={`Queue ${isExpanded ? 'expanded' : ''}`} onClick={toggleQueue}>
            <div className="QueueTitle">Queue</div>
            {isExpanded && (
                <div className="QueueItems" onClick={e => e.stopPropagation()}>
                    {queue.length > 0 ? (
                        queue.map((song, index) => (
                            <div key={song.globalIndex} // Using globalIndex as the key
                                 className={`QueueItem ${song.globalIndex === currentSongIndex ? 'highlight' : ''}`}
                                 onClick={() => handleSongClick(song.globalIndex)}>
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
