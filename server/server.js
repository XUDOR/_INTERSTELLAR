//server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, 'public')));

// Use centralized routes with '/api' as the base path
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
