import React, { useContext } from 'react';
import { CentralQueueContext } from '../../../Contexts/CentralQueueContext'; // Adjust the path as necessary
import './Song.css';

function Song({ song, albumId, localIndex }) {
    const { setSongByAlbumAndIndex } = useContext(CentralQueueContext);

    const handleClickPlay = (e) => {
        e.preventDefault(); // Prevent default action
        console.log("Playing song:", song, "from album", albumId, "at local index", localIndex);
        setSongByAlbumAndIndex(albumId, localIndex); // New function to handle this scenario
    };

    return (
        <div className='Song' onClick={handleClickPlay} role="button" tabIndex="0">
            <div>{song.name}</div>
        </div>
    );
}

export default Song;
