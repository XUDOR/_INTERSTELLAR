-- Insert public user
INSERT INTO users (id, user_name, name_first, name_last, email) 
VALUES (1, 'public_user', 'Public', 'User', 'public@example.com')
ON CONFLICT (id) DO NOTHING;

