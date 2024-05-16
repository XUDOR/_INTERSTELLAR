//playlistRoutes.js

const express = require('express');
const router = express.Router();
const { savePlaylist } = require('../services/playlistService');

router.post('/', async (req, res) => {
    const { name, songs } = req.body;

    try {
        const playlistId = await savePlaylist(name, songs);
        res.status(201).json({ playlistId });
    } catch (err) {
        console.error('Error saving playlist:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
