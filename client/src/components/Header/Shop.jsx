// Shop.jsx
import React from 'react';
import './Shop.css';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  let navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/Shop');
  };

  return (
    <div className="Shop" onClick={handleShopClick}>
      Shop
    </div>
  );
};

export default Shop;
