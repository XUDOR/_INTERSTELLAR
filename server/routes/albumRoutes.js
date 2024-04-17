// albumRoutes.js

const express = require('express');
const router = express.Router();

const { getAlbumById, getAllAlbums } = require('../services/albumService');

// Fetch all albums
router.get('/', async (req, res) => {
  
  try {
    const albums = await getAllAlbums();
    
    res.json(albums);
  } catch (err) {
    console.error('Error fetching all albums:', err);
    res.status(500).send('Server error');
  }
});

// Fetch an album by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const album = await getAlbumById(id);
    if (album) {
      
      res.json(album);
    } else {
      
      res.status(404).send('Album not found');
    }
  } catch (err) {
    console.error(`Error fetching album with ID: ${id}`, err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
