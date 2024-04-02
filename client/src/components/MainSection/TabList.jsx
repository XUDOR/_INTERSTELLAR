// /MainSection/TabList.jsx
import React from 'react';
import './TabList.css';

const TabList = ({ labels, activeTab, onTabClick }) => {
  return (
    <ul className="tab-list">
      {labels.map(({ id, name }) => (
        <li 
          className={id === activeTab ? 'tab-list-item active' : 'tab-list-item'}
          key={id}
          onClick={() => onTabClick(id)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default TabList;
