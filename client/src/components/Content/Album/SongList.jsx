// SongList.jsx
import React from 'react';
import Song from './Song';
import './SongList.css';

function SongList({ songs, setaudioFIleName }) {
  console.log("Received songs in SongList:", songs);
  return (
    <div className='SongList'>
      
      {/* Check if songs is defined and is an array */}
      {Array.isArray(songs) && songs.map((song) => (
        <Song key={song.id} song={song}
        setaudioFIleName={setaudioFIleName} />
      ))}
    </div>
  );
}

export default SongList;
