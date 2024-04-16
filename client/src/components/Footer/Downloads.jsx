// Downloads.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Download } from '../../images/Icons/download-sm.svg';
import './Downloads.css';

const Downloads = () => {
  let navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/downloads');
  };

  return (
    <div className="Downloads" onClick={handleShopClick}>
      <Download className="svg-icon-Download" />
    </div>
  );
};

export default Downloads;
