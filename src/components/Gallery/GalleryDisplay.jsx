// GalleryDisplay.jsx
import React from 'react';
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';
import Album from '../Content/Album/Album';
import AlbumTitle from '../Content/Album/AlbumTitle';
import './GalleryDisplay.css';
import './GalleryItem.css';

function GalleryDisplay({ activeTab, setActiveTab }) {
  // Function to handle tab selection change
  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="GalleryDisplay">
      <Gallery activeTab={activeTab} onTabClick={handleTabClick}>
        <GalleryItem label="1">
          <AlbumTitle />
          <Album />
        </GalleryItem>
        <GalleryItem label="2">
          Content 2
        </GalleryItem>
        <GalleryItem label="3">
          Content 3
        </GalleryItem>
      </Gallery>
    </div>
  );
}

export default GalleryDisplay;
