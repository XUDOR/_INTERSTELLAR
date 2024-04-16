import React, { useState, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import './Queue.css';

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { queue, currentSongIndex, setCurrentSongIndex, clearQueue, shuffleQueue, toggleFavorite, filterFavorites } = useContext(CentralQueueContext);

    // Toggle expand/collapse when clicking on the title or background of the queue
    const toggleQueue = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSongClick = (index) => {
        setCurrentSongIndex(index);
    };

    return (
        <div className={`Queue ${isExpanded ? 'expanded' : ''}`} onClick={(e) => {
          if (e.target === e.currentTarget || e.target.className.includes('QueueTitle')) {
            toggleQueue();
          }
        }}>
            <div className="QueueTitle">Queue</div>
            <button onClick={(e) => {
              e.stopPropagation(); // Prevents toggling when clicking on the button
              clearQueue();
            }}>Clear</button>
            <button onClick={(e) => {
              e.stopPropagation(); // Prevents toggling when clicking on the button
              shuffleQueue();
            }}>Shuffle</button>
            <button onClick={(e) => {
              e.stopPropagation(); // Prevents toggling when clicking on the button
              filterFavorites(); // Assuming this toggles or filters favorites
            }}>Show Favorites</button>
            {isExpanded && (
                <div className="QueueItems" onClick={(e) => e.stopPropagation()}>
                    {queue.length > 0 ? queue.map((song, index) => (
                        <div key={index} 
                             className={`QueueItem ${index === currentSongIndex ? 'highlight' : ''}`}
                             onClick={() => handleSongClick(index)}>
                            {song.name}
                            <span className={`favorite-icon ${song.isFavorite ? 'is-favorite' : ''}`}
                                  onClick={(e) => {
                                      e.stopPropagation(); // Prevent queue item click when clicking the star
                                      toggleFavorite(index);
                                  }}>★</span>
                        </div>
                    )) : <div className="QueueItem">No songs in queue.</div>}
                </div>
            )}
        </div>
    );
};

export default Queue;
