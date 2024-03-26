const express = require('express');
const router = express.Router();

router.get('/image', (req, res) => {
  const authenticatedImageUrl = 
    'https://storage.cloud.google.com/rdxenv-cloud1/ip-charlotta/Charlotta_keep.png'; 
    //replace with an variable
  res.json({ imageUrl: authenticatedImageUrl });
});

module.exports = router;
