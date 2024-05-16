const pool = require('../db');

const savePlaylist = async (name, songs) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const insertPlaylistText = 'INSERT INTO playlists (user_id, name) VALUES ($1, $2) RETURNING id';
        const res = await client.query(insertPlaylistText, [/* User ID here */, name]);
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

module.exports = {
    savePlaylist
};
