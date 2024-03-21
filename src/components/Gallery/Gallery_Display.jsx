import React from 'react';
import Gallery from './Gallery';
import GalleryItem from './GalleryItem';
import './Gallery.css';

function App() {
  return (
    <div className="App">
      <Gallery>
        <GalleryItem label="Artist 1">
          Content for Artist 1
        </GalleryItem>
        <GalleryItem label="Album 2">
          Content for Album 2
        </GalleryItem>
        <GalleryItem label="Artist/Album 3">
          Content for Artist/Album 3
        </GalleryItem>
      </Gallery>
    </div>
  );
}

export default App;
