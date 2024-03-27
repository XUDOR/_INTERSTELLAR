// /MainSection/TabList.jsx
import React from 'react';
import './TabList.css';

const TabList = ({ labels, activeTab, onTabClick }) => {
  console.log("TabList rendered with labels:", labels, "and activeTab:", activeTab);
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
