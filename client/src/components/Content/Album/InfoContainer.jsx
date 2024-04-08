import React from 'react';
import { useMusicData } from '../../../Contexts/MusicDataContext'; // Adjust the path as needed
import Catalogue from './Catalogue';
import Description from './Description';
import Credit from './Credit';
import './InfoContainer.css';

function InfoContainer() {
  const { albumIndex, activeTab } = useMusicData();

  console.log('Current activeTab:', activeTab); // Log the current activeTab
  console.log('Album index:', albumIndex); // Log the entire albumIndex object

  const album = albumIndex[activeTab];
  console.log('Current album data:', album); // Log the current album object

  if (!album) {
    console.log('No album data found for the activeTab. Check if albumIndex is populated correctly and activeTab is set.');
    return <div>Loading album data or no album selected...</div>;
  }

  return (
    <div className='InfoContainer'>
      <Catalogue catalogue={album.catalogue} />
      <Description description={album.description} />
      <Credit credit={album.credit} />
    </div>
  );
}

export default InfoContainer;
