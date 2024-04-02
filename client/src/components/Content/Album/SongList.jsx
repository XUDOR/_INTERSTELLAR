// SongList.jsx
import React from 'react';
import Song from './Song';
import './SongList.css';

function SongList({ songs }) {
  return (
    <div className='SongList'>
      {songs.map((song) => (
        <Song key={song.id} {...song} /> // Assuming `Song` can handle individual song data
      ))}
    </div>
  );
}

export default SongList;
