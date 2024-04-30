require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); 
const path = require('path');

const frontEndDomainProduction = process.env.FRONTEND_DOMAIN_PRODUCTION; // Example: 'https://your-netlify-app.netlify.app'
const frontEndDomainDevelopment = 'http://localhost:3000'; // Adjust port if different

const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 5001; 

// CORS Options
const corsOptions = {
  origin: function (origin, callback) {
    if ([frontEndDomainProduction, frontEndDomainDevelopment].indexOf(origin) !== -1 || !origin) {
      callback(null, true) // Allow if it's one of our sites or server-to-server requests where origin is undefined
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(helmet());
app.use(express.json());

app.use(cors(corsOptions));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api', routes);
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send('Something broke!'); 
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
