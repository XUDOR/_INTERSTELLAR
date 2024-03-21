import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return(
    <div>
      <ul className="tab-list">
        {children.map((tab) => {
          const label = tab.props.label;
        
          return (
            <li 
            className={label === activeTab ? 'tab-list-item active' : 'tab-list-item'}
            key={label}
            onClick={(e) => handleClick(e, label)}
            >
              {label}
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {children.map((one) => {
          if (one.props.label !== activeTab) return undefined;
          return one.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;