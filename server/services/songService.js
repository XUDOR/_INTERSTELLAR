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
    } else {
      console.log(`Service: Song found with ID: ${id}`, rows[0]);
    }
    return rows;
  } catch (err) {
    console.error(`Service: Error fetching song with ID: ${id}`, err);
    throw new Error('Failed to fetch song');
  }
};

module.exports = {
  getSongById,
  getAllSongs
};
