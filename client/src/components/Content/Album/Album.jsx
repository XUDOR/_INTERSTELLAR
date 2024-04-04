// Album.jsx

import React from 'react';
import { API_BASE_URL } from '../../../utils/const';
import Cover from './Cover'; // Adjust the import path as necessary
import './Album.css';

function Album({ albumId }) {
  // Construct the URL to the image served by the backend using the constant
  const imageUrl = `${API_BASE_URL}/api/images/${albumId}`;

  console.log(`Fetching album cover for album ID ${albumId} from: ${imageUrl}`);

  return (
    <div className="album">
      {/* Use the Cover component and pass the imageUrl */}
      <Cover imageUrl={imageUrl} />
    </div>
  );
}

export default Album;


