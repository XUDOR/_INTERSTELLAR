import React, { useState, useEffect } from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList';
import Current from '../Current/Current';
import InfoContainer from '../Content/Album/InfoContainer';
import './Main.css';

function Main() {
  const { albumIndex } = useMusicData();
  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Log the state of albumIndex on each render
  console.log("Main component render, albumIndex:", albumIndex);

  useEffect(() => {
    console.log("Main useEffect for albumIndex:", albumIndex);
    if (Object.keys(albumIndex).length > 0) {
      const firstAlbumId = Object.keys(albumIndex)[0];
      console.log("Setting activeTab to the first albumId:", firstAlbumId);
      setActiveTab(firstAlbumId); // Default to the first album
      setIsLoading(false);
    }
  }, [albumIndex]);

  const tabLabels = Object.values(albumIndex).map(({ id, name }) => ({ id, name }));

  const handleTabClick = (albumId) => {
    console.log("Tab clicked, setting activeTab:", albumId);
    setActiveTab(albumId);
  };

  if (isLoading) {
    console.log("Main component displaying loading state.");
    return <div>Loading...</div>;
  }

  console.log("Main component rendering content, activeTab:", activeTab);
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
