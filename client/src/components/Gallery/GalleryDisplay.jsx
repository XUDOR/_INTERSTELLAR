import React from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext'; // Adjust the path as necessary
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';
import Album from '../Content/Album/Album';
import AlbumTitle from '../Content/Album/AlbumTitle';
import '../Content/Album/AlbumTitle.css';
import './GalleryDisplay.css';
import './GalleryItem.css';

function GalleryDisplay({ activeTab }) {
  const { albumIndex } = useMusicData();

  console.log("GalleryDisplay: activeTab", activeTab);
  console.log("GalleryDisplay: albumIndex", albumIndex);

  // Function is no longer needed if the activeTab is handled by parent component
  // const handleTabClick = (label) => {
  //   setActiveTab(label);
  // };

  return (
    <div className="GalleryDisplay">
      <Gallery activeTab={activeTab}>
        {Object.values(albumIndex).map((album) => (
          <GalleryItem key={album.id} label={album.id.toString()}>
            <AlbumTitle albumId={album.id} />
            <Album albumId={album.id} />
          </GalleryItem>
        ))}
      </Gallery>
    </div>
  );
}

export default GalleryDisplay;
