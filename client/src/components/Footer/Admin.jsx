// Import React if you're using any React features like hooks

//Admin.jsx
import React from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  let navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/admin');
  };

  return (
    <div className="Admin" onClick={handleShopClick}>
      Admin
    </div>
  );
};

export default Admin;
  