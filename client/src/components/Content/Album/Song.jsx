import React, { useContext } from 'react';
import { CentralQueueContext } from '../../../Contexts/CentralQueueContext';
import './Song.css';

function Song({ song }) {
    const { setCurrentSongIndex } = useContext(CentralQueueContext);

    console.log("Received song object in Song component:", song);

    const handleClickPlay = (e) => {
        e.preventDefault(); // Prevent default action
        if (song && song.indexid !== undefined) {
            console.log("Playing song:", song.name, "with index ID", song.indexid);
            setCurrentSongIndex(song.indexid); // Use the index ID directly
        } else {
            console.error("Error: Song or index ID is undefined.", song);
        }
    };

    if (!song) {
        return <div className='Song'>Song data unavailable</div>;
    }

    return (
        <div className='Song' onClick={handleClickPlay} role="button" tabIndex="0">
            <div>{song.name}</div>
        </div>
    );
}

export default Song;
