// useAdminDefinedAlbum.js
import { useContext, useEffect } from 'react';
import { MusicDataContext } from '../Contexts/MusicDataContext';

export const useAdminDefinedAlbum = (adminAlbumId) => {
  const { setActiveTab } = useContext(MusicDataContext);

  useEffect(() => {
    if (adminAlbumId) {
      setActiveTab(adminAlbumId);
    }
  }, [adminAlbumId, setActiveTab]);
};
