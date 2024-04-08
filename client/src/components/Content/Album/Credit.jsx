// Credit.jsx
import React from 'react';
import './Credit.css';

function Credit({ credit }) {
  console.log('Credit:', credit); // Log the credit prop
  return (
    <div className='CreditContent'>
      {credit} 
    </div>
  );
}


export default Credit;
