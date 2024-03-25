// ShopPage.jsx
import React from 'react';
import Header from '../Header/Header';
import './ShopPage.css'; // Assuming you have custom styles for ShopPage

const ShopPage = () => {
  return (
    <>
      <Header className="shop-header" />
      <div className="shopContent"> {/* Add this wrapper */}
        <div className='shopTitle'>Shop</div>
      </div>
    </>
  );
};

export default ShopPage;
