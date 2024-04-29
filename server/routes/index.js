//index.js

const express = require('express');
const router = express.Router();

const albumRoutes = require('./albumRoutes');
const songRoutes = require('./songRoutes');
const centralRoutes = require('./centralRoutes'); 
const stripeWebhook = require('../webhooks/stripeWebhook');

//const adminRoutes = require('./adminRoutes');


router.use('/albums', albumRoutes);
router.use('/songs', songRoutes);
router.use('/central', centralRoutes);
router.use('/webhooks/stripe', stripeWebhook);

//router.use('/admin', adminRoutes);


module.exports = router;
