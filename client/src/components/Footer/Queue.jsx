// Importing useState for state management
import React, { useState } from 'react';
import './Queue.css';

const Queue = () => {
  // State to track if the queue is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // Dummy data for the queue playlist
  const queueItems = ["Song 1", "Song 2", "Song 3", "Song 4"];

  // Function to toggle the queue expansion
  const toggleQueue = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`Queue ${isExpanded ? 'expanded' : ''}`} onClick={toggleQueue}>
      Queue
      {isExpanded && (
        <div className="QueueItems">
          {queueItems.map((item, index) => (
            <div key={index} className="QueueItem">{item}</div>
          ))}
        
        </div>
      )}
    </div>
  );
};

export default Queue;
