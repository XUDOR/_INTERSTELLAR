// User.jsx
import React from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';

const User = () => {
  let navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/user');
  };

  return (
    <div className="User" onClick={handleShopClick}>
      User
    </div>
  );
};

export default User;
