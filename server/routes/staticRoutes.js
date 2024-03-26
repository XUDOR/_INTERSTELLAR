const express = require('express');
const path = require('path');
const router = express.Router();

// Inside your image route
router.get('/image', (req, res) => {
  // Note: Adjust the path according to where your image is located inside the public folder
  const imagePath = path.join(__dirname, '..', '..', 'public', 'CHARLOTTA_cover.png');




  res.sendFile(imagePath);
});

module.exports = router;
