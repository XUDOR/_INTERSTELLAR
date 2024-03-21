import React from 'react';
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';
import './Gallery.css';

function Gallery_Display() {
  return (
    <div className="Gallery_Display">
      <Gallery>
        <GalleryItem label="1">
          Content for Artist 1
        </GalleryItem>
        <GalleryItem label="2">
          Content for Album 2
        </GalleryItem>
        <GalleryItem label="3">
          Content for Artist/Album 3
        </GalleryItem>
      </Gallery>
    </div>
  );
}

export default Gallery_Display;
