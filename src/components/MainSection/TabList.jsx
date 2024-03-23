// TabList.jsx
import React from 'react';
import './TabList.css';

const TabList = ({ children, activeTab, onTabClick }) => {
  return (
    <ul className="tab-list">
      {children.map((tab) => {
        const label = tab.props.label;
        return (
          <li 
            className={label === activeTab ? 'tab-list-item active' : 'tab-list-item'}
            key={label}
            onClick={() => onTabClick(label)}
          >
            {label}
          </li>
        );
      })}
    </ul>
  );
};

export default TabList;
