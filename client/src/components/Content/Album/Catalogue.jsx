// Catalogue.js
import React from 'react';
import './Catalogue.css';

function Catalogue({ catalogue }) {
  
  return (
    <div className='CatalogueContent'>
      {catalogue} 
    </div>
  );
}

export default Catalogue;
