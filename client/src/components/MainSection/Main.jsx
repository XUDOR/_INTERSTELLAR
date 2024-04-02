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
  console.log("Main Component: albumIndex", albumIndex);

  const [activeTab, setActiveTab] = useState(Object.keys(albumIndex)[0]); // Use first album ID as default
  console.log("Main Component: activeTab", activeTab);

  const tabLabels = Object.values(albumIndex).map(({ id, name }) => ({ id, name }));
  console.log("Main Component: tabLabels", tabLabels);

  const handleTabClick = (albumId) => {
    console.log("Main Component: tab clicked", albumId);
    setActiveTab(albumId); // Directly use album ID
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
