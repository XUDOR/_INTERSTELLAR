import React from 'react';
import Cover from './Cover';
import SongList from './SongList';
import InfoContainer from './InfoContainer';
import AlbumTitle from './AlbumTitle';
import './Album.css';

function Album() {
  return (
    <div className='Album'>
      {/*<AlbumTitle></AlbumTitle>*/}
      <Cover></Cover>
      <SongList></SongList>
      <InfoContainer></InfoContainer>
      
    </div>
  );

}


export default Album;