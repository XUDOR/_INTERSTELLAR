-- Drop existing tables to reset the schema
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS playlist_songs CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS songs CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    name_first VARCHAR(255) NOT NULL,
    name_last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Artists Table
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- Albums Table
CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cover_url VARCHAR(255) NOT NULL,
    production_date DATE NOT NULL,
    release_date DATE NOT NULL,
    artist_id INTEGER NOT NULL REFERENCES artists(id),
    description VARCHAR(255) NOT NULL,
    tracks INTEGER NOT NULL
);

-- Songs Table
CREATE TABLE songs (
    id VARCHAR(15) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    audio_url VARCHAR(255) NOT NULL,
    album_id INTEGER NOT NULL REFERENCES albums(id),
    track_id INTEGER NOT NULL
);

-- Playlists Table
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL
);

-- Playlist Songs Junction Table
CREATE TABLE playlist_songs (
    playlist_id INTEGER NOT NULL REFERENCES playlists(id),
    song_id VARCHAR(15) NOT NULL REFERENCES songs(id),
    PRIMARY KEY (playlist_id, song_id)
);

-- Products Table
CREATE TABLE products (
    id VARCHAR(15) PRIMARY KEY,
    cat_id INTEGER NOT NULL,
    price INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    catalogue_id VARCHAR(15) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- Carts Table
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items Table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES carts(id),
    product_id VARCHAR(15) NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
