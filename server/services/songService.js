//songService.js

const pool = require('../db'); // Import the pool

const getAllSongs = async () => {
  console.log('Service: Fetching all songs from the database');
  try {
    const { rows } = await pool.query('SELECT * FROM songs');
    console.log('Service: Songs fetched successfully', rows);
    return rows;
  } catch (err) {
    console.error('Service: Error fetching all songs', err);
    throw new Error('Failed to fetch songs');
  }
};

const getSongById = async (id) => {
  console.log(`Service: Fetching song with ID: ${id}`);
  try {
    const { rows } = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);
    if (rows.length === 0) {
      console.log(`Service: No song found with ID: ${id}`);
      return null;
    } else {
      console.log(`Service: Song found with ID: ${id}`, rows[0]);
      return rows[0]; // Return the first row if found
    }
  } catch (err) {
    console.error(`Service: Error fetching song with ID: ${id}`, err);
    throw new Error('Failed to fetch song');
  }
};

const getSongsByAlbumId = async (albumId) => {
  console.log(`Service: Fetching songs for album ID: ${albumId}`);
  try {
    const { rows } = await pool.query('SELECT * FROM songs WHERE album_id = $1', [albumId]);
    if (rows.length === 0) {
      console.log(`Service: No songs found for album ID: ${albumId}`);
    } else {
      console.log(`Service: Songs fetched for album ID: ${albumId}`, rows);
    }
    return rows; // Return all rows (songs) fetched
  } catch (err) {
    console.error(`Service: Error fetching songs for album ID: ${albumId}`, err);
    throw new Error('Failed to fetch songs for album');
  }
};

module.exports = {
  getAllSongs,
  getSongById,
  getSongsByAlbumId // Export the new function
};
