// albumRoutes.js

const express = require('express');
const router = express.Router();

const { getAlbumById, getAllAlbums } = require('../services/albumService');

// Fetch all albums
router.get('/', async (req, res) => {
  console.log('Received request to fetch all albums');
  try {
    const albums = await getAllAlbums();
    console.log('Fetched albums:', albums);
    res.json(albums);
  } catch (err) {
    console.error('Error fetching all albums:', err);
    res.status(500).send('Server error');
  }
});

// Fetch an album by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Received request to fetch album with ID: ${id}`);
  try {
    const albums = await getAlbumById(id);
    if (albums.length > 0) {
      console.log('Fetched album:', albums[0]);
      res.json(albums[0]);
    } else {
      console.log(`Album with ID: ${id} not found`);
      res.status(404).send('Album not found');
    }
  } catch (err) {
    console.error(`Error fetching album with ID: ${id}`, err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
