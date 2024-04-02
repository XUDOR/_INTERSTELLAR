import React, { useState } from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext'; // Adjust the path as necessary
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList';
import Current from '../Current/Current';
import SongList from '../Content/Album/SongList';
import InfoContainer from '../Content/Album/InfoContainer';
import './Main.css';

function Main() {
  const { albumIndex } = useMusicData();
  const [activeTab, setActiveTab] = useState('1'); // Initially, no tab is selected

  // Generate tab labels dynamically from albumIndex
  const tabLabels = Object.values(albumIndex).map(album => album.name);

  const handleTabClick = (albumName) => {
    // Find album by name to set as active tab. This assumes album names are unique.
    const album = Object.values(albumIndex).find(album => album.name === albumName);
    if (album) {
      setActiveTab(album.id); // Use album ID as the identifier for active tabs
    }
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
