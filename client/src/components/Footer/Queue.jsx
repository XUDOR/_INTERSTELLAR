import React, { useState, useContext } from 'react';
import { CentralQueueContext } from '../../Contexts/CentralQueueContext';
import './Queue.css';

const Queue = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        queue, 
        currentSongIndex, 
        setCurrentSongIndex, 
       // clearQueue, 
        shuffleQueue, 
        resetQueue, 
        toggleFavorite, 
        toggleShowFavorites,
        showFavorites
    } = useContext(CentralQueueContext);

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
            {/*<button onClick={(e) => { e.stopPropagation(); clearQueue(); }}>Clear</button>*/}
            <button onClick={(e) => { e.stopPropagation(); shuffleQueue(); }}>Shuffle</button>
            <button onClick={(e) => { e.stopPropagation(); resetQueue(); }}>Reset Queue</button>
           <button onClick={(e) => { e.stopPropagation(); toggleShowFavorites(); }}>             
                {showFavorites ? 'Show All' : 'Show Favorites'}                                     
            </button>
            {isExpanded && (
                <div className="QueueItems" onClick={(e) => e.stopPropagation()}>
                    {queue.filter(song => !showFavorites || song.isFavorite).map((song, index) => (
                        <div key={song.id || index}
                             className={`QueueItem ${index === currentSongIndex ? 'highlight' : ''}`}
                             onClick={() => handleSongClick(index)}>
                            {song.name}
                            <span className={`favorite-icon ${song.isFavorite ? 'is-favorite' : ''}`}
                                  onClick={(e) => {
                                      e.stopPropagation(); // Prevent queue item click when clicking the star
                                      toggleFavorite(index);
                                  }}>★</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Queue;
