import React from 'react';
import { useMusicData } from '../../Contexts/MusicDataContext';

const TabList = () => {
  const { state, dispatch } = useMusicData();

  // Assuming state includes { albumIndex, activeTab, isLoading }
  const { albumIndex, activeTab, isLoading } = state;

  if (isLoading) {
    return <div>Loading tabs...</div>;
  }

  const handleTabClick = (albumId) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: albumId });
  };

  return (
    <ul className="tab-list">
      {Object.entries(albumIndex).map(([id, { name }]) => (
        <li 
          className={id === activeTab ? 'tab-list-item active' : 'tab-list-item'}
          key={id}
          onClick={() => handleTabClick(id)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default TabList;
