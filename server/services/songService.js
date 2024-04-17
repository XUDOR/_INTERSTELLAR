//songService.js

const pool = require('../db'); // Import the pool

const getAllSongs = async () => {
  
  try {
    const { rows } = await pool.query('SELECT * FROM songs');
    
    return rows;
  } catch (err) {
    console.error('Service: Error fetching all songs', err);
    throw new Error('Failed to fetch songs');
  }
};

const getSongById = async (id) => {
  
  try {
    const { rows } = await pool.query('SELECT * FROM songs WHERE id = $1', [id]);
    if (rows.length === 0) {
      
      return null;
    } else {
      
      return rows[0]; // Return the first row if found
    }
  } catch (err) {
    console.error(`Service: Error fetching song with ID: ${id}`, err);
    throw new Error('Failed to fetch song');
  }
};

const getSongsByAlbumId = async (albumId) => {
  
  try {
    const { rows } = await pool.query('SELECT * FROM songs WHERE album_id = $1', [albumId]);
    if (rows.length === 0) {
      
    } else {
      
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
