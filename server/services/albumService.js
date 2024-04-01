const pool = require('../db'); // Import the pool

const getAllAlbums = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM albums');
    return rows;
  } catch (err) {
    console.error('Error fetching all albums:', err);
    throw new Error('Failed to fetch albums');
  }
};

const getAlbumById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM albums WHERE id = $1', [id]);
  return rows;
};

module.exports = {
  getAlbumById,
  getAllAlbums
};
