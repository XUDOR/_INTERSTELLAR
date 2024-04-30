// Load environment variables from .env file
require('dotenv').config();

// Import necessary Node.js modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Security middleware for setting HTTP headers
const path = require('path');

// Import route configurations
const routes = require('./routes');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5001; // Port from environment variable or default to 5001

// Apply Helmet to enhance API security
app.use(helmet());

// Automatically parse JSON-formatted request bodies
app.use(express.json());

// Enable CORS with default settings to allow cross-origin requests
app.use(cors());

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// Mount centralized routes with '/api' as the base path
app.use('/api', routes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).send('Something broke!'); // Send generic server error message
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
