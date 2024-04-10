// songRoutes.js
const express = require('express');
const router = express.Router();

// Assuming you have or will create this function in your song service
const { getSongById, getAllSongs, getSongsByAlbumId } = require('../services/songService');

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

// Fetch songs by album ID
router.get('/album/:albumId', async (req, res) => {
  const { albumId } = req.params;
  console.log(`Received request to fetch songs for album ID: ${albumId}`);
  try {
    const songs = await getSongsByAlbumId(albumId);
    if (songs.length > 0) {
      console.log(`Fetched songs for album ID: ${albumId}`, songs);
      res.json(songs);
    } else {
      console.log(`No songs found for album ID: ${albumId}`);
      res.status(404).send('No songs found for this album');
    }
  } catch (err) {
    console.error(`Error fetching songs for album ID: ${albumId}`, err);
    res.status(500).send('Server error');
  }
});

// Fetch a song by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Received request to fetch song with ID: ${id}`);
  try {
    const song = await getSongById(id);
    if (song) {
      console.log('Fetched song:', song);
      res.json(song);
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

