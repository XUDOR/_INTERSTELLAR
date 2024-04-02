// GalleryDisplay.jsx
import React from 'react';
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';
import Album from '../Content/Album/Album';
import AlbumTitle from '../Content/Album/AlbumTitle'; // Import AlbumTitle component
import '../Content/Album/AlbumTitle.css';
import './GalleryDisplay.css';
import './GalleryItem.css';

function GalleryDisplay({ activeTab, setActiveTab }) {
  console.log("GalleryDisplay showing content for tab:", activeTab);
  // Function to handle tab selection change
  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="GalleryDisplay">
      <Gallery activeTab={activeTab} onTabClick={handleTabClick}>
        <GalleryItem label="1">
          <AlbumTitle albumId={1} /> {/* Pass album ID 1 for the first tab */}
          
          <Album />
        </GalleryItem>
        <GalleryItem label="2">
          <AlbumTitle albumId={2} /> {/* Pass album ID 2 for the second tab */}
          
          {/* Other content for tab 2 */}
        </GalleryItem>
        <GalleryItem label="3">
          <AlbumTitle albumId={3} /> {/* Pass album ID 3 for the third tab */}
          
          {/* Other content for tab 3 */}
        </GalleryItem>
      </Gallery>
    </div>
  );
}

export default GalleryDisplay;
