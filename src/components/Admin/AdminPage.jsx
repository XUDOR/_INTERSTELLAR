// AdminPage.jsx
import React from 'react';
import Header from '../Header/Header';
import './AdminPage.css'; // Assuming you have custom styles for ShopPage

const AdminPage = () => {
  return (
    <>
      <Header className="Admin-header" />
      <div className="AdminContent"> {/* Add this wrapper */}
        <div className='AdminTitle'>_ADMIN</div>
      </div>
    </>
  );
};

export default AdminPage;
  