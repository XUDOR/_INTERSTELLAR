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

  console.log("songIndex state at Main component:", state.songIndex); // Log the entire songIndex state for debugging

  const renderAlbumDivs = () => {
    return Object.entries(state.albumIndex).map(([albumId, { name, cover_url }]) => {

      // Place debugging logs here to check the structure, keys, and values
      console.log("Keys in songIndex:", Object.keys(state.songIndex).map(key => typeof key));
      console.log("Type and value of albumId being accessed:", typeof albumId, albumId);
      console.log(state.songIndex); // Check the structure and contents
      console.log(albumId); // Ensure this matches keys in songIndex

      // Attempt to retrieve songs for this specific albumId from songIndex
      const songsForThisAlbum = state.songIndex[albumId] || [];

      console.log("Mapping albumId to songs", {
        albumId,
        songsForThisAlbum: songsForThisAlbum
      });

      return (
        <div key={albumId} className="album-container">
          <div className="album-info">
            <h3 className='albumTitle'>{name}</h3>
            <Cover imageUrl={cover_url} altText={`Cover of ${name}`} />
          </div>
          <SongList songs={songsForThisAlbum} />
          <InfoContainer albumId={albumId} />
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
