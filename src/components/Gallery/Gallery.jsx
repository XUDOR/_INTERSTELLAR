// Gallery.jsx
import React, { useState } from 'react';
import TabList from '../MainSection/TabList'; // Assuming it's in the same directory
//import './Gallery.css';

const Gallery = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div>
      <TabList activeTab={activeTab} onTabClick={handleTabClick}>
        {children}
      </TabList>
      <div className="tab-content">
        {children.map((one) => {
          if (one.props.label !== activeTab) return undefined;
          return one.props.children;
        })}
      </div>
    </div>
  );
};

export default Gallery;
