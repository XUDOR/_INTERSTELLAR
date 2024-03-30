const pool = require('../db'); // Import the pool

const getAlbumById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM albums WHERE id = $1', [id]);
  return rows;
};

module.exports = {
  getAlbumById,
};
