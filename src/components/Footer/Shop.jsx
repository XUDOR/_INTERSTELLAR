// Import React if you're using any React features like hooks
import React from 'react';
// Import the CSS file for the Shop component
import './Shop.css';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  let navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/shop');
  };

  return (
    <div className="Shop" onClick={handleShopClick}>
      Shop
    </div>
  );
};

export default Shop;
