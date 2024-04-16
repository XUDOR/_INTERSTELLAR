// Film.jsx
import React from 'react';
import './Film.css';
import { useNavigate } from 'react-router-dom';

const Film = () => {
  let navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/Film');
  };

  return (
    <div className="Film" onClick={handleShopClick}>
      Film
    </div>
  );
};

export default Film;
