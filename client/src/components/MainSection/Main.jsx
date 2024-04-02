import React, { useState, useEffect } from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList';
import Current from '../Current/Current';
import SongList from '../Content/Album/SongList';
import InfoContainer from '../Content/Album/InfoContainer';
import './Main.css';

function Main() {
  const { albumIndex, songIndex } = useMusicData(); // Assuming songIndex is structured similarly
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(albumIndex).length > 0) {
      setActiveTab(Object.keys(albumIndex)[0]);
      setIsLoading(false);
    }
  }, [albumIndex]);

  const tabLabels = Object.values(albumIndex).map(({ id, name }) => ({ id, name }));

  // Assuming songIndex maps album IDs to song lists
  const activeSongs = activeTab ? songIndex[activeTab] : [];

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
      <SongList songs={activeSongs} /> {/* Pass activeSongs to SongList */}
      <InfoContainer />
      <Current />
    </div>
  );
}


export default Main;    