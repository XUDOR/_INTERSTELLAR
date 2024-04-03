// useCycleAlbums.js
import { useContext, useEffect } from 'react';
import { MusicDataContext } from '../Contexts/MusicDataContext';

export const useCycleAlbums = (interval = 5000) => {
  const { albumIndex, setActiveTab, isDataFetched } = useContext(MusicDataContext);

  useEffect(() => {
    let currentIndex = 0;
    if (isDataFetched && Object.keys(albumIndex).length > 0) {
      const albumIds = Object.keys(albumIndex);
      
      const cycleAlbums = () => {
        setActiveTab(albumIds[currentIndex]);
        currentIndex = (currentIndex + 1) % albumIds.length;
      };
      
      const intervalId = setInterval(cycleAlbums, interval);
      return () => clearInterval(intervalId);
    }
  }, [isDataFetched, albumIndex, setActiveTab, interval]);
};
