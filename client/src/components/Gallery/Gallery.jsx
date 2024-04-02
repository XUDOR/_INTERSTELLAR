import React from 'react';
import './Gallery.css';

const Gallery = ({ children, activeTab, onTabClick }) => {
  console.log("Gallery Component: Rendering with activeTab", activeTab);

  // If children is not an array (e.g., when there's only one child), wrap it in an array
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="Gallery">
      <div className="tab-content">
        {childrenArray.map((child) => {
          const display = child.props.label === activeTab ? 'block' : 'none';
          console.log(`Gallery Component: Displaying tab ${child.props.label} as ${display}`);
          return (
            <div key={child.props.label} style={{ display }}>
              {child.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;