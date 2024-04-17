import React, { useContext } from 'react';
import { CentralQueueContext } from '../../../Contexts/CentralQueueContext';
import './Song.css';

function Song({ song }) {
    const { setCurrentSongIndex } = useContext(CentralQueueContext);

    const handleClickPlay = (e) => {
        e.preventDefault();
        if (song && song.indexid !== undefined) {
            
            setCurrentSongIndex(song.indexid - 1);  // Adjust for zero-based indexing
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
