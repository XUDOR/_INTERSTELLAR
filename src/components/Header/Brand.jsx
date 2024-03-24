// Header/brand.jsx

import React from 'react';
import './Brand.css';
import LogoSVG from '../../images/IP_TAG24.svg';

const Brand = () => {
  return (
    <div className="brand">
      <img src ={LogoSVG} alt="LOGO" />
    </div>
  );
};

export default Brand;
