// Import React if you're using any React features like hooks
import React from 'react';
import './Downloads.css';
import { useNavigate } from 'react-router-dom';

const Downloads = () => {
  let navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/downloads');
  };

  return (
    <div className="Downloads" onClick={handleShopClick}>
      Downloads
    </div>
  );
};

export default Downloads;
