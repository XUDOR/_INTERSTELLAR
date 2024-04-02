import React from 'react';
import './TabList.css';

const TabList = ({ labels, activeTab, onTabClick }) => {
  console.log("TabList Component: labels", labels);
  console.log("TabList Component: activeTab", activeTab);

  return (
    <ul className="tab-list">
      {labels.map(({ id, name }) => (
        <li 
          className={id.toString() === activeTab.toString() ? 'tab-list-item active' : 'tab-list-item'}
          key={id}
          onClick={() => {
            console.log("TabList Component: Tab clicked", id);
            onTabClick(id);
          }}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default TabList;
