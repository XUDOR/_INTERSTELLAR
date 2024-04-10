import React from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import Cover from '../Content/Album/Cover';
import InfoContainer from '../Content/Album/InfoContainer';
import SongList from '../Content/Album/SongList';
import './Main.css';
import '../Content/Album/Cover.css';
import '../Content/Album/InfoContainer.css';

function Main() {
  const { state } = useMusicData();

  console.log("State at Main component:", state); // Log the entire state for debugging

  const renderAlbumDivs = () => {
    // Ensuring we're referencing the correct state object and providing a fallback
    const albums = Object.values(state.albumIndex || {});

    return albums.map((album) => {
      // Ensuring we're referencing the correct state object and providing a fallback
      const songsForThisAlbum = state.songIndex[album.id] || [];

      // Detailed logs for debugging songs data fetching and rendering
      console.log(`Rendering album ${album.name} with ID ${album.id}`);
      console.log(`Songs for album ${album.name}:`, songsForThisAlbum);

      return (
        <div key={album.id} className="album-container">
          <div className="album-info">
            <h3 className='albumTitle'>{album.name}</h3>
            <Cover imageUrl={album.cover_url} altText={`Cover of ${album.name}`} />
          </div>
          <SongList songs={songsForThisAlbum} />
          <InfoContainer albumId={album.id} />
        </div>
      );
    });
  };

  return (
    <div className='Main'>
      {state.isLoading ? <div>Loading...</div> : renderAlbumDivs()}
    </div>
  );
}

export default Main;
