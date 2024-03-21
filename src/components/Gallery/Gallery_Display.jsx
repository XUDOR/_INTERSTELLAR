import React from 'react';
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';
import './Gallery.css';
import Album from '../Content/Album/Album';

function Gallery_Display() {
  return (
    <div className="Gallery_Display">
      <Gallery>
        <GalleryItem label="1">
          <Album></Album>
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

export default Gallery_Display;
