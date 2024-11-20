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

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin received:", origin); // Debugging: Log the incoming origin
    const allowedOrigins = [frontEndDomainProduction, frontEndDomainDevelopment];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow requests from whitelisted origins or server-side requests
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));



app.use(helmet());
app.use(express.json());

app.use(cors());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api', routes);
app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).send('Something broke!'); 
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
