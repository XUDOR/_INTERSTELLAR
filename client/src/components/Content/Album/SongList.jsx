// SongList.jsx
import React from 'react';
import Song from './Song';

function SongList({ songs }) {
  return (
    <div className='SongList'>
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SongList;
