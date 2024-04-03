// useRandomAlbum.js
import { useContext, useEffect } from 'react';
import { MusicDataContext } from '../Contexts/MusicDataContext';

export const useRandomAlbum = () => {
  const { albumIndex, setActiveTab, isDataFetched } = useContext(MusicDataContext);

  useEffect(() => {
    if (isDataFetched && Object.keys(albumIndex).length > 0) {
      const albumIds = Object.keys(albumIndex);
      const randomAlbumId = albumIds[Math.floor(Math.random() * albumIds.length)];
      setActiveTab(randomAlbumId);
    }
  }, [isDataFetched, albumIndex, setActiveTab]);
};
