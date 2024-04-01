const express = require('express');
const router = express.Router();
const pool = require('../db')

const { getAlbumById, getAllAlbums } = require('../services/albumService'); // Corrected import

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
    const rows = await getAlbumById(id);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Album not found');
    }
  } catch (err) {
    console.error('Error fetching album:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
