// /components/Content/Album/SongList.jsx
import React from 'react';
import Song from './Song';
import './SongList.css';

function SongList({ songs, setCurrentSong }) {
  console.log("Received setCurrentSong in SongList:", setCurrentSong);
  console.log("Received songs in SongList:", songs);
  return (
    <div className='SongList'>
      
      {/* Check if songs is defined and is an array */}
      {Array.isArray(songs) && songs.map((song) => (
        <Song key={song.id} song={song}
        setCurrentSong={setCurrentSong} />
      ))}
    </div>
  );
}

export default SongList;
