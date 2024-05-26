const pool = require('../db');

const savePlaylist = async (name, songs) => {
    const client = await pool.connect();
    const public_user_id = 1; // Default public user ID

    try {
        await client.query('BEGIN');
        const insertPlaylistText = 'INSERT INTO playlists (user_id, name) VALUES ($1, $2) RETURNING id';
        const res = await client.query(insertPlaylistText, [public_user_id, name]);
        const playlistId = res.rows[0].id;

        const insertSongsText = 'INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2)';
        const songPromises = songs.map(song => client.query(insertSongsText, [playlistId, song.id]));

        await Promise.all(songPromises);
        await client.query('COMMIT');

        return playlistId;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getPlaylists = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query(`
            SELECT p.id, p.name, json_agg(s.*) as songs
            FROM playlists p
            JOIN playlist_songs ps ON p.id = ps.playlist_id
            JOIN songs s ON ps.song_id = s.id
            GROUP BY p.id
        `);
        return res.rows;
    } finally {
        client.release();
    }
};

const deletePlaylist = async (playlistId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM playlist_songs WHERE playlist_id = $1', [playlistId]);
        await client.query('DELETE FROM playlists WHERE id = $1', [playlistId]);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    savePlaylist,
    getPlaylists,
    deletePlaylist
};
