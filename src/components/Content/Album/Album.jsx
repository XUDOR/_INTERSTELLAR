import React from 'react';
import Cover from './Cover';
import './Album.css';
import coverImage from '../../../images/CHARLOTTA_cover.png';



function Album() {
  const coverImageUrl = coverImage;
  return (
    <div className='Album'>
      <Cover imageUrl={coverImageUrl}/>
    </div>
  );

}


export default Album;