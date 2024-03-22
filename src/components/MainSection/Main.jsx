import React from 'react';
import Gallery_Display from '../Gallery/Gallery_Display';
import Current from '../Current/Current';
import './Main.css'

function Main() {
  return (
      <div className='Main'>
          <Gallery_Display></Gallery_Display>
          <Current></Current>
      </div>
  );
}

export default Main;