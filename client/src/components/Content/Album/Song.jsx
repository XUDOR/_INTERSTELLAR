import React, { useContext } from 'react';
import { CentralQueueContext } from '../../../Contexts/CentralQueueContext';
import './Song.css';

function Song({ song }) {
    const { setCurrentSongIndex } = useContext(CentralQueueContext);

    const handleClickPlay = (e) => {
        e.preventDefault(); // Prevent default action
        console.log("Playing song:", song.name, "with global index", song.globalIndex);
        setCurrentSongIndex(song.globalIndex); // Use the global index directly
    };

    return (
        <div className='Song' onClick={handleClickPlay} role="button" tabIndex="0">
            <div>{song.name}</div>
        </div>
    );
}

export default Song;
