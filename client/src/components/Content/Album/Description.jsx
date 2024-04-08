// Description.jsx
import React from 'react';
import './Description.css';

function Description({ description }) {
  console.log('Description:', description); // Log the description prop
  return (
    <div className='DescriptionContent'>
      {description} 
    </div>
  );
}


export default Description;
