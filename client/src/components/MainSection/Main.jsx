import React, { useState, useEffect } from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList';
import Current from '../Current/Current';
import InfoContainer from '../Content/Album/InfoContainer';
import './Main.css';

function Main() {
  const { albumIndex } = useMusicData(); // Removed songIndex since it's no longer directly used in Main
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(albumIndex).length > 0) {
      setActiveTab(Object.keys(albumIndex)[0]); // Default to the first album
      setIsLoading(false);
    }
  }, [albumIndex]); // Removed songIndex from the dependency array since it's no longer used here

  const tabLabels = Object.values(albumIndex).map(({ id, name }) => ({ id, name }));
  
  const handleTabClick = (albumId) => {
    setActiveTab(albumId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Main'>
      <TabList activeTab={activeTab} onTabClick={handleTabClick} labels={tabLabels} />
      <GalleryDisplay activeTab={activeTab} />
      
      <InfoContainer />
      <Current />
    </div>
  );
}

export default Main;
