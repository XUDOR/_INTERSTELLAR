// centralRoutes.js

const express = require('express');
const router = express.Router();

// Import necessary functions from the centralService
// Assuming these functions are defined to fetch songs and handle queue logic
const { getSongByIndex, getAllSongsSortedByIndex, getNextSong, getPreviousSong } = require('../services/centralService');

// Fetch all songs sorted by index
router.get('/songs', async (req, res) => {
  
  try {
    const songs = await getAllSongsSortedByIndex();
    
    res.json(songs);
  } catch (err) {
    console.error('Error fetching songs:', err);
    res.status(500).send('Server error');
  }
});

// Fetch a single song by its index in the queue
router.get('/songs/:index', async (req, res) => {
  const { index } = req.params;
  
  try {
    const song = await getSongByIndex(index);
    if (song) {
      res.json(song);
    } else {
      res.status(404).send('Song not found at the specified index');
    }
  } catch (err) {
    console.error(`Error fetching song at index ${index}:`, err);
    res.status(500).send('Server error');
  }
});

// Fetch the next song in the queue
router.get('/songs/next', async (req, res) => {
  
  try {
    const song = await getNextSong();
    res.json(song);
  } catch (err) {
    console.error('Error fetching the next song:', err);
    res.status(500).send('Server error');
  }
});

// Fetch the previous song in the queue
router.get('/songs/previous', async (req, res) => {
  
  try {
    const song = await getPreviousSong();
    res.json(song);
  } catch (err) {
    console.error('Error fetching the previous song:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
