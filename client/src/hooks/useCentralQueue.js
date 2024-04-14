import { useContext } from 'react';
import { CentralQueueContext } from '../Contexts/CentralQueueContext'; // Adjust the path as necessary

export const useCentralQueue = () => {
  const { state, setQueue, setCurrentSongIndex, goToNextSong, goToPreviousSong } = useContext(CentralQueueContext);
  return { state, setQueue, setCurrentSongIndex, goToNextSong, goToPreviousSong };
};
