// Shop.jsx

import React from 'react';
import './Shop.css';

const Shop = ({ onShopClick }) => {
  return (
    <div className="Shop" onClick={onShopClick}>
      Shop
    </div>
  );
};

export default Shop;
