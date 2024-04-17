import React from 'react';
import Song from './Song';
import './SongList.css';

function SongList({ songs, albumId }) {
    

    return (
        <div className='SongList'>
            {songs.map((song, index) => (
                <Song key={song.id} song={song} albumId={albumId} localIndex={index + 1} />
            ))}
        </div>
    );
}

export default SongList;
