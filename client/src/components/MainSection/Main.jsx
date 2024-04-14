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
  console.log("Main component state:", { albumIndex, songIndex, isLoading });

  const renderAlbumDivs = () => {
    if (!albumIndex || Object.keys(albumIndex).length === 0) {
      console.log("No albums to render, albumIndex is empty or undefined.");
      return <div>No albums available.</div>;
    }

    const albums = Object.values(albumIndex);
    console.log("Rendering albums, count:", albums.length); // Log the number of albums being rendered

    return albums.map((album) => {
      const songsForThisAlbum = songIndex[album.id] || [];
      console.log(`Rendering album: ${album.name} with ID: ${album.id}, song count: ${songsForThisAlbum.length}`); // Log each album's details

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
