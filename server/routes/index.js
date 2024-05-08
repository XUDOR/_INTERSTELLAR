const express = require('express');
const router = express.Router();
const albumRoutes = require('./albumRoutes');
const songRoutes = require('./songRoutes');
const centralRoutes = require('./centralRoutes');
const paymentRoutes = require('./paymentRoutes');
const stripeWebhook = require('../webhooks/stripeWebhook');
const contactRoutes = require('./contactRoutes');  // Import contact routes

// Setup route middlewares
router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);
router.use('/central', centralRoutes);
router.use('/webhooks/stripe', stripeWebhook);
router.use('/payment', paymentRoutes);
router.use('/contact', contactRoutes);  // Use contact routes

module.exports = router;
