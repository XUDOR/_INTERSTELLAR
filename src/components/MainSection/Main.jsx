import React from 'react';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import Current from '../Current/Current';
import './Main.css'

function Main() {
  return (
      <div className='Main'>
          <GalleryDisplay></GalleryDisplay>
          <Current></Current>
      </div>
  );
}

export default Main;