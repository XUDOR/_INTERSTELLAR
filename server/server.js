require('dotenv').config(); // Make sure to require dotenv at the top
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Import centralized routes
const pool = require('./db'); // Assuming db.js is set up for global use

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Needed to parse JSON bodies
app.use(cors());

// Use centralized routes with '/api' as the base path
app.use('/api', routes);

// Error handling middleware should be the last piece of middleware added
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
