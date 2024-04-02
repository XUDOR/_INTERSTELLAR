import React, { useState, useEffect } from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList';
import Current from '../Current/Current';
import SongList from '../Content/Album/SongList';
import InfoContainer from '../Content/Album/InfoContainer';
import './Main.css';

function Main() {
  const { albumIndex } = useMusicData();
  const [activeTab, setActiveTab] = useState(null); // Start with null
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // When albumIndex is updated, set the first album as the active tab
  useEffect(() => {
    if (Object.keys(albumIndex).length > 0) {
      setActiveTab(Object.keys(albumIndex)[0]);
      setIsLoading(false); // Set loading to false after data is fetched
    }
  }, [albumIndex]); // This effect runs when albumIndex changes

  const tabLabels = Object.values(albumIndex).map(({ id, name }) => ({ id, name }));

  const handleTabClick = (albumId) => {
    setActiveTab(albumId);
  };

  // Render a loading state if data is not yet fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

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