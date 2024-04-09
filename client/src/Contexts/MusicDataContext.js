import React, { createContext, useContext } from 'react';
import { useMusicDataReducer } from '../hooks/useMusicDataReducer';

export const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [state, dispatch] = useMusicDataReducer();

  return (
    <MusicDataContext.Provider value={{ state, dispatch }}>
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
