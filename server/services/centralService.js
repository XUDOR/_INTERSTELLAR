// centralService.js

const pool = require('../db'); // Import the database connection pool

// Fetch all songs sorted by their indexID (assuming indexID is a column in your songs table)
const getAllSongsSortedByIndex = async () => {
  
  try {
    const { rows } = await pool.query('SELECT * FROM songs ORDER BY indexID ASC');
    
    return rows;
  } catch (err) {
    console.error('Service: Error fetching all songs sorted by index', err);
    throw new Error('Failed to fetch songs sorted by index');
  }
};

// Fetch a single song by its indexID
const getSongByIndex = async (index) => {
  
  try {
    const { rows } = await pool.query('SELECT * FROM songs WHERE indexID = $1', [index]);
    if (rows.length === 0) {
      
      return null;
    } else {
      
      return rows[0]; // Return the first row if found
    }
  } catch (err) {
    console.error(`Service: Error fetching song with IndexID: ${index}`, err);
    throw new Error('Failed to fetch song by index');
  }
};

// Assuming getNextSong and getPreviousSong will compute the next and previous index based on the current song's index
// These functions might require additional context about the current song's index which could be passed from the client or managed in session
const getNextSong = async (currentIndex) => {
  
  try {
    // This example assumes you wrap around the queue
    const { rows } = await pool.query('SELECT * FROM songs WHERE indexID > $1 ORDER BY indexID ASC LIMIT 1', [currentIndex]);
    if (rows.length === 0) {
      // If no next song, wrap to the first song
      return (await pool.query('SELECT * FROM songs ORDER BY indexID ASC LIMIT 1')).rows[0];
    } else {
      return rows[0];
    }
  } catch (err) {
    console.error('Service: Error fetching the next song', err);
    throw new Error('Failed to fetch the next song');
  }
};

const getPreviousSong = async (currentIndex) => {
  
  try {
    const { rows } = await pool.query('SELECT * FROM songs WHERE indexID < $1 ORDER BY indexID DESC LIMIT 1', [currentIndex]);
    if (rows.length === 0) {
      // If no previous song, wrap to the last song
      return (await pool.query('SELECT * FROM songs ORDER BY indexID DESC LIMIT 1')).rows[0];
    } else {
      return rows[0];
    }
  } catch (err) {
    console.error('Service: Error fetching the previous song', err);
    throw new Error('Failed to fetch the previous song');
  }
};

module.exports = {
  getAllSongsSortedByIndex,
  getSongByIndex,
  getNextSong,
  getPreviousSong
};
