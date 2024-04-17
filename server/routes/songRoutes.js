// songRoutes.js
const express = require('express');
const router = express.Router();

// Assuming you have or will create this function in your song service
const { getSongById, getAllSongs, getSongsByAlbumId } = require('../services/songService');

// Fetch all songs
router.get('/', async (req, res) => {
  
  try {
    const songs = await getAllSongs();
    
    res.json(songs);
  } catch (err) {
    console.error('Error fetching all songs:', err);
    res.status(500).send('Server error');
  }
});

// Fetch songs by album ID
router.get('/album/:albumId', async (req, res) => {
  const { albumId } = req.params;
  
  try {
    const songs = await getSongsByAlbumId(albumId);
    if (songs.length > 0) {
      
      res.json(songs);
    } else {
      
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
  
  try {
    const song = await getSongById(id);
    if (song) {
      
      res.json(song);
    } else {
      
      res.status(404).send('Song not found');
    }
  } catch (err) {
    console.error(`Error fetching song with ID: ${id}`, err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

