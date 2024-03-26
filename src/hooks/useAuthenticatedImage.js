//useAuthenticatedImage.js

import { useState, useEffect } from 'react';

const useAuthenticatedImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the authenticated image URL from your Express server
    fetch('/api/image')
      .then(response => response.json())
      .then(data => setImageUrl(data.imageUrl))
      .catch(error => console.error('Error fetching image URL:', error));
  }, []);

  return imageUrl;
};

export default useAuthenticatedImage;
