-- schema_2.sql

-- Drop the table if it exists to avoid errors when creating
DROP TABLE IF EXISTS admin_tab_config CASCADE;

-- Create the table with a fresh structure
CREATE TABLE IF NOT EXISTS admin_tab_config (
    id SERIAL PRIMARY KEY,
    tab_number INTEGER NOT NULL,
    is_editable BOOLEAN NOT NULL DEFAULT true,
    additional_config JSONB
);

-- Populate the table with initial data
INSERT INTO admin_tab_config (tab_number, is_editable) VALUES
(1, false),  -- Tab 1 is not editable as per your requirement
(2, true),   -- Assuming tabs 2 and 3 are editable
(3, true);
