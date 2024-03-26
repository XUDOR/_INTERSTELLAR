const express = require('express');
const cors = require('cors'); // Import CORS module
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // Use CORS middleware here, before defining any routes

// Import the imageRoutes module
//const imageRoutes = require('./routes/imageRoutes'); ------> commented to toogle to static route for hook
const imageRoutes = require('./routes/staticRoutes');


// Use the routes with the '/api' prefix
app.use('/api', imageRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
