// /routes/StaticRoutes.js

const express = require('express');
const path = require('path');
const ImageService = require('../services/imageService'); // Adjust the path as needed
const router = express.Router();

router.get('/images/:albumId', (req, res) => {
  const { albumId } = req.params;
  console.log('Received request for album ID:', albumId); // Log the album ID received

  const imageName = ImageService.getImageNameByAlbumId(albumId);
  console.log('Resolved image name:', imageName); // Log the resolved image name

  if (!imageName) {
    console.log('No image found for album ID:', albumId); // Log when no image is found
    return res.status(404).send('Image not found');
  }

  const imagePath = path.join(__dirname, '..', '..', 'src', 'images', 'Covers', imageName);
  console.log('Attempting to send file at path:', imagePath); // Log the file path

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error sending file:', err); // Log error during send
      res.status(404).send('Image not found');
    }
  });
});


module.exports = router;