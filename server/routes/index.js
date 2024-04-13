//index.js

const express = require('express');
const router = express.Router();

const albumRoutes = require('./albumRoutes');
//const adminRoutes = require('./adminRoutes');
//const artistRoutes = require('./artistRoutes');
const songRoutes = require('./songRoutes');
//const coverRoutes = require('./coverRoutes');
//const playerRoutes = require('./playerRoutes'); 
// Import other routes here

router.use('/albums', albumRoutes);
//router.use('/admin', adminRoutes);
//router.use('/artists', artistRoutes);
router.use('/songs', songRoutes);
//router.use('/covers', coverRoutes);
//router.use('/player', playerRoutes);
// Use other routes here

module.exports = router;
