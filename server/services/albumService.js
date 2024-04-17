//AlbumService.js

const pool = require('../db'); // Import the pool

const getAllAlbums = async () => {
  
  try {
    const { rows } = await pool.query('SELECT * FROM albums');
    
    return rows;
  } catch (err) {
    console.error('Service: Error fetching all albums', err);
    throw new Error('Failed to fetch albums');
  }
};

const getAlbumById = async (id) => {
  
  try {
    const { rows } = await pool.query('SELECT * FROM albums WHERE id = $1', [id]);
    if (rows.length === 0) {
      
    } else {
      
    }
    return rows[0];
  } catch (err) {
    console.error(`Service: Error fetching album with ID: ${id}`, err);
    throw new Error('Failed to fetch album');
  }
};

module.exports = {
  getAlbumById,
  getAllAlbums
};
