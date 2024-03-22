import React from 'react';
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';
import Album from '../Content/Album/Album';
import AlbumTitle from '../Content/Album/AlbumTitle';
import '../Content/Album/AlbumTitle.css';
import './Gallery.css';

function Gallery_Display() {
  return (
    <div className="Gallery_Display">
      <Gallery>
        <GalleryItem label="1">
          <AlbumTitle></AlbumTitle>
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
