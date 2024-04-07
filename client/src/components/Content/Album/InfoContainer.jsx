// infocontainer.jsx
import React from 'react';
import Catalogue from './Catalogue';
import Description from './Description';
import Credit from './Credit';
import './InfoContainer.css';

function InfoContainer() {
  return (
    <div className='InfoContainer'>
    <Catalogue />
    <Description />
    <Credit />
    </div>
  );
}

export default InfoContainer; 