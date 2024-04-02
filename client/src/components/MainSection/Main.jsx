// Main.jsx
import React, { useState, useEffect } from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList';
import Current from '../Current/Current';
import SongList from '../Content/Album/SongList';
import InfoContainer from '../Content/Album/InfoContainer';
import './Main.css';

function Main() {
  const { albumIndex, songIndex } = useMusicData();
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(albumIndex).length > 0 && Object.keys(songIndex).length > 0) {
      setActiveTab(Object.keys(albumIndex)[0]); // Default to first album
      setIsLoading(false);
    }
  }, [albumIndex, songIndex]);

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
      {/* Assuming you want to display songs for the active album */}
      <SongList songs={Object.values(songIndex).filter(song => song.albumId === parseInt(activeTab))} />
      <InfoContainer />
      <Current />
    </div>
  );
}

export default Main;
