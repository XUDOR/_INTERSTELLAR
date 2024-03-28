// Gallery.jsx
import React from 'react';
import './Gallery.css';

const Gallery = ({ children, activeTab, onTabClick }) => {
  return (
    <div className="Gallery">
      {/* ... Other components or markup */}
      <div className="tab-content">
        {children.map((one) => {
          const display = one.props.label === activeTab ? 'block' : 'none'; // Only display the active tab content
          return (
            <div key={one.props.label} style={{ display }}>
              {one.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
