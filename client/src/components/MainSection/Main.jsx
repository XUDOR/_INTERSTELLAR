import React from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import Cover from '../Content/Album/Cover'; // Corrected import path
//import AlbumTitle from '../Content/Album/AlbumTitle'; // Adjust the import path as necessary



import './Main.css';

function Main() {
  const { state, dispatch } = useMusicData();

  // Function to handle clicking on an album div
  const handleAlbumClick = (albumId) => {
    // Dispatch to set an active album ID
    dispatch({ type: 'SET_ACTIVE_TAB', payload: albumId });
  };

  // Function to render minimal album information as clickable divs
  const renderAlbumDivs = () => {
    return Object.entries(state.albumIndex).map(([albumId, { name, cover_url }]) => (


      <div key={albumId} className="album-div" onClick={() => handleAlbumClick(albumId)}>
        <div className="album-info">
          <h3 className='albumTitle'>{name}</h3>
          {/* You can expand here to include more information if needed */}
        </div>
        <Cover imageUrl={cover_url} altText={`Cover of ${name}`} />
        
      </div>
    ));
  };

  return (
    <div className='Main'>
      {state.isLoading ? <div>Loading...</div> : renderAlbumDivs()}
    </div>
  );
}

export default Main;
