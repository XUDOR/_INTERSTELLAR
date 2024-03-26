// Import React if you're using any React features like hooks
import React from 'react';
import './EPK.css';
import { useNavigate } from 'react-router-dom';

const EPK = () => {
  let navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/epk');
  };

  return (
    <div className="EPK" onClick={handleShopClick}>
      EPK
    </div>
  );
};

export default EPK;
