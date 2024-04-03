import { useContext, useEffect } from 'react';
import { MusicDataContext } from '../Contexts/MusicDataContext';

const useSongsForActiveAlbum = () => {
  const { albumIndex, songIndex, activeTab, isDataFetched } = useContext(MusicDataContext);
  
  useEffect(() => {
    if (isDataFetched && activeTab && albumIndex[activeTab]) {
      // Logic to handle songs for the active album
      // For example, setting local state, triggering a re-render, etc.
      const songsForActiveAlbum = Object.values(songIndex).filter(song => song.album_id.toString() === activeTab.toString());
      console.log('Songs for active album:', songsForActiveAlbum);
    }
  }, [activeTab, isDataFetched, albumIndex, songIndex]);
};

export default useSongsForActiveAlbum;
