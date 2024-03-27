import React from 'react';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList'; 
import Current from '../Current/Current'; 
import SongList from '../Content/Album/SongList';
import InfoContainer from '../Content/Album/InfoContainer';
import useDynamicTabs from '../../hooks/useDynamicTabs';
import './Main.css';

function Main() {
  const { tabLabels } = useDynamicTabs(['1', '2', '3']);
  const [activeTab, setActiveTab] = React.useState('1');

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className='Main'>
      <TabList activeTab={activeTab} onTabClick={handleTabClick} labels={tabLabels} />
      <GalleryDisplay activeTab={activeTab} />
      <SongList />
      <InfoContainer />
      <Current />
    </div>
  );
}

export default Main;
