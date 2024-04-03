//GalleryItem.jsx
import React from "react";
import './GalleryItem.css';

const GalleryItem = ({ children }) => {
  return <div className="container">{children}
  </div>;
};

export default GalleryItem;

