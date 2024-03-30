// albumRoutes.js

const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming this is your database connection pool

// Directly using an async function for route handling
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching album with ID: ${id}`); // Debug log

  try {
    const { rows } = await pool.query('SELECT * FROM albums WHERE id = $1', [id]);
    if (rows.length > 0) {
      console.log('Album found:', rows[0]); // Debug log
      res.json(rows[0]);
    } else {
      console.log('Album not found'); // Debug log
      res.status(404).send('Album not found');
    }
  } catch (err) {
    console.error('Error fetching album:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
