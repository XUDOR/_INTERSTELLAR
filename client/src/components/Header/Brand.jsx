//Brand.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './Brand.css';
import LogoSVG from '../../images/Icons/IP_TAG24.svg';

const Brand = () => {
  
  return (
    <div className="brand">
      {/* Wrap your img tag in a Link tag */}
      <Link to="/">
        <img src={LogoSVG} alt="Logo" />
      </Link>
    </div>
  );
};

export default Brand;
