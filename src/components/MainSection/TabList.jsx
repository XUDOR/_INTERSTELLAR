// TabList.jsx
import React from 'react';
import './TabList.css';

const TabList = ({ labels, activeTab, onTabClick }) => {
  return (
    <ul className="tab-list">
      {labels.map((label) => (
        <li 
          className={label === activeTab ? 'tab-list-item active' : 'tab-list-item'}
          key={label}
          onClick={() => onTabClick(label)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
};

export default TabList;