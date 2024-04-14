import React, { useState, useContext } from 'react';
import { MusicDataContext } from '../../Contexts/MusicDataContext'; // Adjust the import path as necessary
import './Queue.css';

const Queue = ({ currentSong }) => {
  // State to track if the queue is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // Access music data from context
  const { state } = useContext(MusicDataContext);
  const { songIndex } = state;

  // Create a flat list of all songs
  const allSongs = Object.values(songIndex).flat();

  // Function to toggle the queue expansion
  const toggleQueue = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`Queue ${isExpanded ? 'expanded' : ''}`} onClick={toggleQueue}>
      Queue
      {isExpanded && (
        <div className="QueueItems">
          {allSongs.length > 0 ? (
            allSongs.map((song, index) => (
              <div key={index} className={`QueueItem ${song === currentSong ? 'highlight' : ''}`}>
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
