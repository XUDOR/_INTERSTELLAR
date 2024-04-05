const pool = require('../db'); // Import the pool

const getAllAlbums = async () => {
  console.log('Service: Fetching all albums from the database');
  try {
    const { rows } = await pool.query('SELECT * FROM albums');
    console.log('Service: Albums fetched successfully', rows);
    return rows;
  } catch (err) {
    console.error('Service: Error fetching all albums', err);
    throw new Error('Failed to fetch albums');
  }
};

const getAlbumById = async (id) => {
  console.log(`Service: Fetching album with ID: ${id}`);
  try {
    const { rows } = await pool.query('SELECT * FROM albums WHERE id = $1', [id]);
    if (rows.length === 0) {
      console.log(`Service: No album found with ID: ${id}`);
    } else {
      console.log(`Service: Album found with ID: ${id}`, rows[0]);
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
