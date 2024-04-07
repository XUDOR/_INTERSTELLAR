import React from 'react';
import './TabList.css';

const TabList = ({ labels, activeTab, onTabClick }) => {
  // Log the entire labels array to see what we're working with each render
  console.log("TabList Component: labels", JSON.stringify(labels));
  
  // Log the current activeTab to understand which tab should be highlighted
  console.log("TabList Component: activeTab", activeTab);

  return (
    <ul className="tab-list">
      {labels.map(({ id, name }) => (
        <li 
          className={id.toString() === activeTab.toString() ? 'tab-list-item active' : 'tab-list-item'}
          key={id}
          onClick={() => {
            // This log helps in tracking user interactions with the tab list
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
