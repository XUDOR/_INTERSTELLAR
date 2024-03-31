const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming your db.js exports the pooled connection

const { updateTabConfigs } = require('../services/tabService');

// Fetch tab configuration
router.get('/tab-config', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM admin_tab_config');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tab configuration');
  }
});

// Update tab 

router.post('/update-tabs', async (req, res) => {
  const { tabsToUpdate } = req.body;

  try {
    await updateTabConfigs(tabsToUpdate);
    res.json({ message: "Tabs updated successfully, excluding Tab 1." });
  } catch (error) {
    console.error("Error updating tabs:", error);
    res.status(500).json({ error: "Error updating tabs" });
  }
});

module.exports = router;
