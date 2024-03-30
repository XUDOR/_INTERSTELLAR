import React, { createContext, useState, useContext } from 'react';

const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {
  const [album, setAlbum] = useState(null);

  return (
    <AlbumContext.Provider value={{ album, setAlbum }}>
      {children}
    </AlbumContext.Provider>
  );
};

// Custom hook to use the album context
export const useAlbum = () => useContext(AlbumContext);
