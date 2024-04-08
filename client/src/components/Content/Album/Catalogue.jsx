// Catalogue.jsx
import React from 'react';
import './Catalogue.css';

function Catalogue({ catalogue }) {
  console.log('Catalogue:', catalogue); // Log the catalogue prop
  return (
    <div className='CatalogueContent'>
      {catalogue} catalogue
    </div>
  );
}


export default Catalogue;
