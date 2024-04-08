// InfoContainer.jsx or the component that renders Description, Credit, and Catalogue
import React from 'react';
import { useMusicData } from '../../../Contexts/MusicDataContext';
import Catalogue from './Catalogue';
import Description from './Description';
import Credit from './Credit';

function InfoContainer() {
  const { albumIndex, activeTab } = useMusicData();
  const currentAlbum = albumIndex[activeTab]; // Access current album directly with activeTab

  if (!currentAlbum) {
    return <div>Loading album data or no album selected...</div>;
  }

  // Now pass the current album's data as props to child components
  return (
    <div className='InfoContainer'>
      <Catalogue catalogue={currentAlbum.catalogue} />
      <Description description={currentAlbum.description} />
      <Credit credit={currentAlbum.credit} />
    </div>
  );
}

export default InfoContainer;
