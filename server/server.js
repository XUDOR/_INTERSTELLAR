require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { Pool } = require('pg');

const frontEndDomainProduction = process.env.FRONTEND_DOMAIN_PRODUCTION; // Example: 'https://your-netlify-app.netlify.app'
const frontEndDomainDevelopment = 'http://localhost:3000'; // Adjust port if different

const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 5001;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Middleware
app.use(helmet());
app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin received:", origin);
    const allowedOrigins = [frontEndDomainProduction, frontEndDomainDevelopment];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Test DB route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
