// /routes/StaticRoutes.js

const express = require('express');
const path = require('path');
const ImageService = require('../services/imageService'); // Adjust the path as needed
const router = express.Router();

router.get('/images/:albumId', async (req, res) => {
  const { albumId } = req.params;
  
  const imageName = ImageService.getImageNameByAlbumId(albumId);

  if (!imageName) {
    return res.status(404).send('Image not found');
  }

  const imagePath = path.join(__dirname, '..', '..', 'src', 'images', 'Covers', imageName);
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.log(err); // Log for debugging
      res.status(404).send('Image not found');
    }
  });
});

module.exports = router;