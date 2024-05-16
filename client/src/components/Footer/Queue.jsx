import React, { useState, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import './Queue.css';

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        queue, 
        currentSongIndex, 
        setCurrentSongById, 
        shuffleQueue, 
        resetQueue, 
        toggleFavorite, 
        toggleShowFavorites,
        showFavorites
    } = useContext(CentralQueueContext);

    const toggleQueue = () => {
        setIsExpanded(!isExpanded);
    };

    const handleSongClick = (id) => {
        setCurrentSongById(id);
    };

    return (
        <div className={`Queue ${isExpanded ? 'expanded' : ''}`} onClick={(e) => {
            if (e.target === e.currentTarget || e.target.className.includes('QueueTitle')) {
                toggleQueue();
            }
        }}>
            <div className="QueueTitle">Queue</div>
            <button onClick={(e) => { e.stopPropagation(); shuffleQueue(); }}>Shuffle</button>
            <button onClick={(e) => { e.stopPropagation(); resetQueue(); }}>Reset Queue</button>
            <button onClick={(e) => { e.stopPropagation(); toggleShowFavorites(); }}>
                {showFavorites ? 'Show All' : 'Show Favorites'}
            </button>
            {isExpanded && (
                <div className="QueueItems" onClick={(e) => e.stopPropagation()}>
                    {queue.filter(song => !showFavorites || song.isFavorite).map((song) => (
                        <div key={song.id}
                             className={`QueueItem ${song.globalIndex === currentSongIndex ? 'highlight' : ''}`}
                             onClick={() => handleSongClick(song.id)}>
                            {song.name}
                            <span className={`favorite-icon ${song.isFavorite ? 'is-favorite' : ''}`}
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(song.id);
                                  }}>★</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Queue;