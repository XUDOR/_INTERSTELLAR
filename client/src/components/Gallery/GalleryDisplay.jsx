import React from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';
import Album from '../Content/Album/Album';
import AlbumTitle from '../Content/Album/AlbumTitle';
import SongList from '../Content/Album/SongList'; // Assuming this component exists


import '../Content/Album/SongList.css';
import '../Content/Album/AlbumTitle.css';
import './GalleryDisplay.css'

function GalleryDisplay({ activeTab }) {
  const { albumIndex, songIndex } = useMusicData();
  
  // Active album data
  const activeAlbum = albumIndex[activeTab];
  
  // Songs for the active album
  const songsForActiveAlbum = songIndex[activeTab] || [];

  return (
    <div className="GalleryDisplay">
      {activeAlbum ? (
        <Gallery activeTab={activeTab}>
          {/* Single GalleryItem for the active album */}
          <GalleryItem key={activeAlbum.id} label={activeAlbum.id.toString()}>
            <div className='AlbumBlock'>
            <AlbumTitle albumId={activeAlbum.id} />
            <Album albumId={activeAlbum.id} />
            </div>
            {/* Displaying songs for the active album */}
            <SongList songs={songsForActiveAlbum} />
          </GalleryItem>
        </Gallery>
      ) : (
        <div>Loading or no album selected...</div>
      )}
    </div>
  );
}

export default GalleryDisplay;
