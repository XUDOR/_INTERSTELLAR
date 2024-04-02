const express = require('express');
const router = express.Router();

const { getSongById, getAllSongs } = require('../services/songService');

// Fetch all songs
router.get('/', async (req, res) => {
  console.log('Received request to fetch all songs');
  try {
    const songs = await getAllSongs();
    console.log('Fetched songs:', songs);
    res.json(songs);
  } catch (err) {
    console.error('Error fetching all songs:', err);
    res.status(500).send('Server error');
  }
});

// Fetch a song by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Received request to fetch song with ID: ${id}`);
  try {
    const song = await getSongById(id);
    if (song.length > 0) {
      console.log('Fetched song:', song[0]);
      res.json(song[0]);
    } else {
      console.log(`Song with ID: ${id} not found`);
      res.status(404).send('Song not found');
    }
  } catch (err) {
    console.error(`Error fetching song with ID: ${id}`, err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
