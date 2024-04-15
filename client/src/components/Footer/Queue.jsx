import React, { useState, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import './Queue.css';

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { queue, currentSongIndex, setCurrentSongIndex } = useContext(CentralQueueContext);

    const toggleQueue = () => {
        setIsExpanded(!isExpanded);
    };

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
                            <div key={index}
                                 className={`QueueItem ${index === currentSongIndex ? 'highlight' : ''}`}
                                 onClick={(e) => {
                                     e.stopPropagation(); // Stop the queue from toggling
                                     handleSongClick(index);
                                 }}>
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
