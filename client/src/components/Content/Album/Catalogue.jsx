// Catalogue.js
import React from 'react';
import './Catalogue.css';

function Catalogue({ catalogue }) {
  console.log('Rendering Catalogue:', catalogue);
  return (
    <div className='CatalogueContent'>
      {catalogue} 
    </div>
  );
}

export default Catalogue;
