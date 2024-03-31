// services/tabService.js
const pool = require('../db');

const updateTabConfigs = async (tabsToUpdate) => {
  const promises = tabsToUpdate.map(tab => {
    if (tab.tab_number !== 1) {
      return pool.query(`
        INSERT INTO admin_tab_config (tab_number, is_editable, additional_config)
        VALUES ($1, $2, $3)
        ON CONFLICT (tab_number) DO UPDATE SET
        is_editable = EXCLUDED.is_editable,
        additional_config = EXCLUDED.additional_config
        WHERE tab_number <> 1;`, [tab.tab_number, tab.is_editable, tab.additional_config]);
    }
  }).filter(Boolean);
  await Promise.all(promises);
};

module.exports = { updateTabConfigs };
