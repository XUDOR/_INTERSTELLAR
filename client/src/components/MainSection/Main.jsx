import React from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import Cover from '../Content/Album/Cover';
import InfoContainer from '../Content/Album/InfoContainer';
import SongList from '../Content/Album/SongList';
import './Main.css';
import '../Content/Album/Cover.css';
import '../Content/Album/InfoContainer.css';

function Main({ setCurrentSong }) {
  const { state } = useMusicData();
  const { albumIndex, songIndex, isLoading } = state;

  // Log the state after receiving it from context
  

  const renderAlbumDivs = () => {
    if (!albumIndex || Object.keys(albumIndex).length === 0) {
      
      return <div>No albums available.</div>;
    }

    const albums = Object.values(albumIndex);
    

    return albums.map((album) => {
      const songsForThisAlbum = songIndex[album.id] || [];
      

      return (
        <div key={album.id} className="album-container">
          <div className="album-info">
            <h3 className='albumTitle'>{album.name}</h3>
            <Cover imageUrl={album.cover_url} altText={`Cover of ${album.name}`} />
          </div>
          <SongList songs={songsForThisAlbum} setCurrentSong={setCurrentSong} />
          <InfoContainer albumId={album.id} />
        </div>
      );
    });
  };

  return (
    <div className='Main'>
      {isLoading ? <div>Loading...</div> : renderAlbumDivs()}
    </div>
  );
}

export default Main;
