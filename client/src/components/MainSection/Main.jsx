import React, { useState } from 'react';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList'; 
import Current from '../Current/Current'; 
import SongList from '../Content/Album/SongList';
import InfoContainer from '../Content/Album/InfoContainer';
import { useTabs } from '../../Contexts/TabContext'; // Ensure the path matches the actual location
import './Main.css';

function Main() {
  // Now also destructure adminModified from useTabs
  const { tabLabels, adminModified } = useTabs(); 
  const [activeTab, setActiveTab] = useState('1');

  console.log("Main rendered with tabLabels:", tabLabels, "and activeTab:", activeTab, "adminModified:", adminModified);

  const handleTabClick = (label) => {
    console.log("Tab clicked:", label);
    setActiveTab(label);
  };

  // Function to ensure the "album" in label 1 is not overwritten
  const getValidatedTabLabels = () => {
    if (adminModified && tabLabels.length >= 1 && tabLabels[0] !== "Album") {
      return ["Album", ...tabLabels.slice(1)];
    }
    return tabLabels;
  };

  return (
    <div className='Main'>
      {adminModified ? (
        // Use getValidatedTabLabels to ensure the "Album" in tab 1 is preserved
        <TabList activeTab={activeTab} onTabClick={handleTabClick} labels={getValidatedTabLabels()} />
      ) : (
        // Default setup before admin modification
        <>
          <TabList activeTab={activeTab} onTabClick={handleTabClick} labels={tabLabels} />
          <GalleryDisplay activeTab={activeTab} />
          <SongList />
          <InfoContainer />
          <Current />
        </>
      )}
    </div>
  );
}

export default Main;




//------------ original

/*import React, { useState } from 'react';
import GalleryDisplay from '../Gallery/GalleryDisplay';
import TabList from './TabList'; 
import Current from '../Current/Current'; 
import SongList from '../Content/Album/SongList';
import InfoContainer from '../Content/Album/InfoContainer';
import { useTabs } from '../../Contexts/TabContext'; // Adjust the import path as necessary
import './Main.css';

function Main() {
  const { tabLabels } = useTabs(); // Using global context for tab labels
  const [activeTab, setActiveTab] = useState('1'); // Keeping activeTab state local to Main, if needed globally, move this to context

  console.log("Main rendered with tabLabels:", tabLabels, "and activeTab:", activeTab);

  const handleTabClick = (label) => {
    console.log("Tab clicked:", label);
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
console.log('Main');

export default Main;
*/