// /MainSection/Main.jsx
import React, { useState } from 'react';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList'; // Adjust the path as necessary
import Current from '../Current/Current'; // Corrected path
import SongList from '../Content/Album/SongList';
import InfoContainer from '../Content/Album/InfoContainer';
import './Main.css';

function Main() {
  // The state for the active tab is managed here
  const [activeTab, setActiveTab] = useState('1');

  // This method is used to change the active tab
  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  // Labels for the tabs
  const tabLabels = ['1', '2', '3'];

  return (
    <div className='Main'>
      <TabList activeTab={activeTab} onTabClick={handleTabClick} labels={tabLabels} />
      <GalleryDisplay activeTab={activeTab} onSetActiveTab={setActiveTab} />
      <SongList></SongList>
      <InfoContainer></InfoContainer>
      <Current />
      
    </div>
  );
}

export default Main;
