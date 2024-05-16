//index.js

const express = require('express');
const router = express.Router();
const albumRoutes = require('./albumRoutes');
const songRoutes = require('./songRoutes');
const centralRoutes = require('./centralRoutes');
const playlistRoutes = require('./playlistRoutes');  // Import playlist routes
const paymentRoutes = require('./paymentRoutes');
const stripeWebhook = require('../webhooks/stripeWebhook');
const contactRoutes = require('./contactRoutes'); 

router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);
router.use('/central', centralRoutes);
router.use('/playlists', playlistRoutes);  // Use playlist routes
router.use('/webhooks/stripe', stripeWebhook);
router.use('/payment', paymentRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
