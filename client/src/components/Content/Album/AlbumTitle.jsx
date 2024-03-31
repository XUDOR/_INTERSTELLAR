// AlbumTitle.jsx

import React, { useEffect } from 'react';
import { useAlbum } from '../../../Contexts/AlbumContext';

function AlbumTitle({ albumId }) {
  const { album, setAlbum } = useAlbum();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        console.log('Fetching album data for albumId:', albumId); // Log fetching album data
        const response = await fetch(`/api/albums/${albumId}`);
        console.log('Response status:', response.status); // Log response status
        if (!response.ok) {
          throw new Error('Failed to fetch album data');
        }
        const albumData = await response.json();
        console.log('Fetched album data:', albumData); // Log fetched album data
        setAlbum(albumData);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    if (albumId) {
      console.log('Album ID is present, initiating fetch...'); // Log initiating fetch
      fetchAlbumData();
    } else {
      console.log('Album ID is not present, skipping fetch...'); // Log skipping fetch
    }
  }, [albumId, setAlbum]);

  if (!album) {
    console.log('Album data is not available, rendering Loading...'); // Log rendering Loading...
    return <div>Loading...</div>;
  }

  console.log('Album data is available, rendering album name:', album.name); // Log rendering album name
  return <div className='AlbumTitle'>{album.name}</div>;
}

export default AlbumTitle;
