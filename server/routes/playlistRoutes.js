const express = require('express');
const router = express.Router();
const { savePlaylist, getPlaylists, deletePlaylist } = require('../services/playlistService');

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

router.get('/', async (req, res) => {
    try {
        const playlists = await getPlaylists();
        res.json(playlists);
    } catch (err) {
        console.error('Error fetching playlists:', err);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deletePlaylist(id);
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting playlist:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
