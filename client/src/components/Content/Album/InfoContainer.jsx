// src/components/Content/Album/InfoContainer.js
import React from 'react';
import { useMusicData } from '../../../Contexts/MusicDataContext'; // Ensure path correctness
import Catalogue from './Catalogue';
import Description from './Description';
import Credit from './Credit';

function InfoContainer({ albumId }) {
  const { state } = useMusicData();
  const albumDetails = state.albumIndex[albumId] || {}; // Use albumId to get details

  return (
    <div className='InfoContainer'>
      <Catalogue catalogue={albumDetails.catalogue} />
      <Description description={albumDetails.description} />
      <Credit credit={albumDetails.credit} />
    </div>
  );
}

export default InfoContainer;

