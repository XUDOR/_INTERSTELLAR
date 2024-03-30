// albumRoutes.js

const express = require('express');
const router = express.Router();
const { getAlbumById } = require('../services/albumService'); // Import the service

// Define a route for getting an album by ID
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
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
